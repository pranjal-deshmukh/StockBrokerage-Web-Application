'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'lewistd',
    password : '@Longview1102',
    database : 'brokerage'
  });

class ExchangeService {

    getStockPrice(stockSymbol) {
        let query_result;

        connection.connect();
        connection.query(`SELECT Price As price FROM stocks WHERE Stock_Name = '${stockSymbol}'`, function (error, results, fields) {
            if (error) throw error;
            // console.log('The solution is: ', results[0].solution);
            console.log('Query result: ', results);
            return results;
        });
        connection.end();
        console.log(`query_result: ${query_result}`);
        let price = 25.25;//query_result[0].price;
        console.log(`Retrieving latest stock price for: ${stockSymbol} = ${price}`);
        return {price: price};
    }

}

module.exports = ExchangeService;