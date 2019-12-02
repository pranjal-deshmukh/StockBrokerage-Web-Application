// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.idUser);
    });

    // used to deserialize the user
    passport.deserializeUser(function(idUser, done) {
        connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE `idUser` = "+ idUser, function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP =============================================================
    // =========================================================================
    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will overridUsere with email
                usernameField : 'username', // can be an email if you want
                passwordField : 'password',
                passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
            },
            function(req, username, password, done) {
                // find a user whose username is the same as the forms username
                // we are checking to see if the user trying to login already exists
                connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE `username` = '" + username + "'", function(err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        // if there is no user with that username
                        // create the user
                        var newUser = {};

                        newUser.username = username;
                        newUser.password = bcrypt.hashSync(password, null, null);  // use the generateHash function in our user model

                        var insertQuery = "INSERT INTO " + dbconfig.users_table + " " +
                            "( `username`, `password` ) " +
                            "values ('" + newUser.username + "','" + newUser.password + "')";

                        connection.query(insertQuery, function(err, rows) {
                            newUser.idUser = rows.insertId;

                            return done(null, newUser);
                        });
                    }
                });
            }
        )
    );


    // =========================================================================
    // LOCAL LOGIN ============================================================
    // =========================================================================
    passport.use(
        'local-login',
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) { // callback with email and password from our form
                connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE `username` = '" + username + "'", function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'Incorrect login info'));//'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Incorrect login info'));//'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, rows[0]);
                });
            }
        )
    );
	
}
