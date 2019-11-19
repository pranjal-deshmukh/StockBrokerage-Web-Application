'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'lewistd',
    password : '@Longview1102',
    database : 'brokerage'
  });

function stockPrice(stockSymbol, callback) {
    connection.query(`SELECT Price As price FROM stocks WHERE Stock_Name = '${stockSymbol}'`, function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        console.log('Query result: ', results);
        // query_result = results;
        return callback(results);
    });
}

class ExchangeService {

    getStockPrice(stockSymbol) {

        // connection.connect();
        // connection.query(`SELECT Price As price FROM stocks WHERE Stock_Name = '${stockSymbol}'`, function (error, results, fields) {
        //     if (error) throw error;
        //     // console.log('The solution is: ', results[0].solution);
        //     console.log('Query result: ', results);
        //     query_result = results;
        //     return results;
        // });
        // connection.end();

        let result = [];
        stockPrice(stockSymbol, function(db_result) {
            result = db_result;
        });

        console.log(`query_result: ${result}`);
        let price = 25.25;//query_result[0].price;
        console.log(`Retrieving latest stock price for: ${stockSymbol} = ${price}`);
        return {price: price, db_res: result};
    }

}

module.exports = ExchangeService;