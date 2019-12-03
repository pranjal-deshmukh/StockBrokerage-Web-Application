module.exports = function(app, passport) {
	var axios = require('axios');
// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	// STOCK SEARCH =========================
	app.get('/search', isLoggedIn, function(req, res) {
		// var searchStock = require('./searchstock');
		res.render('search.ejs', {
			utils: 'hi'//searchStock
		});
	});

	// SHOW STOCK PRICES
	app.get('/show/:stock/:time', isLoggedIn, function(req, res) {
		var stock = req.params.stock;
		var time = req.params.time;

		var date = new Date();
		// console.log('date ISO: ' + date.toISOString);

		if (time === 'wk') {
			time = 'This Week';
			let day = date.getDay();
			//TODO: logic to set date for current week
		} else if (time === '1wk') {
			time = 'Last Week';
			//TODO: logic to set date for past week
		} else if (time === 'mo') {
			time = 'This Month';
			date.setFullYear(date.getFullYear(), date.getMonth(), 1);
		} else if (time === 'yr') {
			time = 'This Year';
			date.setFullYear(date.getFullYear(), 0, 1);
		} else {
			time = 'Past 5 Years';
			date.setFullYear(date.getFullYear() - 5, date.getMonth(), date.getDate());
		}

		//get price info from exchange app.
		function getCurrentPrice() {
			const url = 'http://localhost:8081/api/getLatestStockPrice';
			const data = {
				symbol: stock
			};

			return axios({
				method: 'post',
				url: url,
				data: data
			});
		}
		function getPriceHistory() {
			const url = 'http://localhost:8081/api/getStockHistory';
			const data = {
				symbol: stock,
				timestamp: date.toISOString()
			};

			return axios({
				method: 'post',
				url: url,
				data: data
			});
		}
		axios.all([getCurrentPrice(), getPriceHistory()]).then((result) => {
			console.log('curr: ', result[0].data);
			console.log('history: ', result[1].data);

			res.render('showstock.ejs', {
				utils: {stock, time, curr: result[0].data.price, history: result[1].data.history}
			});
		}).catch(err => console.log(err));

		
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			
			failureFlash : true // allow flash messages
		}));



// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN /  =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));



// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});



};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
