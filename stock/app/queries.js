// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var add_bank_account=function(userid,bank_account_number,routing_number) {
  
   
    const sql = "Insert into bank(`userid`,`account_no`,`routing_no`) values('" +userid+ "','" +bank_account_number+ "','" +routing_number + "')";
    connection.query(sql,
        function (error, results, fields) {
            if (error) throw error;
            console.log('Inserting bank details');
            return results;
    });
   
}

module.exports={
    add_bank_account:add_bank_account};