'use strict';

const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'sk99',
    database : 'brokerage',
    multipleStatements : true
});

function priceChange(price) {
    // fluctuate price between -25% and +25%
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    if (plusOrMinus === 1) {    
        //increase stock price
        price = price * (1 + ((Math.floor(Math.random() * 25) + 1) * 0.01));
    } else {
        //decrease stock price
        price = price * (1 - ((Math.floor(Math.random() * 25) + 1) * 0.01));
    }
    return price.toFixed(2) * 1;
}

function updatePrices() {
    const sql = 'Select s.Stock_Name, s.Price, s.`Timestamp`, s.Company ' +
                'From stocks s ' +
                'Join (Select st.Stock_Name, max(st.`Timestamp`) as `timestamp` '+
                'From stocks st '+
                'group by Stock_Name) tb on s.Stock_Name = tb.Stock_Name and s.`Timestamp` = tb.`timestamp` '+
                'group by Stock_Name, s.Price, s.`Timestamp`, s.Company';
    connection.query(sql,
        function (error, results, fields) {
            if (error) throw error;
            console.log('Current latest prices result: ', results);
            console.log('length: ', results.length);
            for (let i = 0; i < results.length; i++) {
                //update price of each stock
                let price = priceChange(results[i].Price);
                results[i].Price = price;
            }
            console.log('Stocks after change: ', results);
            console.log('after length: ', results.length);
            //send update to db
            let update = '';
            for (let j = 0; j < results.length; j++) {
                update = update + `insert into stocks(Stock_Name, Price, Company) values ("${results[j].Stock_Name}", ${results[j].Price}, "${results[j].Company}"); `;
            }
            // console.log(update);
            connection.query(update, null);
            console.log('\ndb updated with new stock prices and timestamps');
            return results;
    });
}
setInterval(updatePrices, 120000); //update every 2 minutes

router.post('/getLatestStockPrice', (req,res) => {
    connection.query(`SELECT Price As price, Timestamp as timestamp, Company as company FROM stocks WHERE Stock_Name = '${req.body.symbol}' ORDER BY Timestamp DESC Limit 1`,
        function (error, results, fields) {
            if (error) throw error;

            console.log('getLatestStockPrice result: ', results);

            res.send(results[0]);
            return results;
    });
});

router.post('/getStockHistory', (req, res) => {
    connection.query(`SELECT Price As price, Timestamp as timestamp FROM stocks WHERE Stock_Name = '${req.body.symbol}' and Timestamp >= '${req.body.timestamp}' ORDER BY Timestamp DESC`,
        function (error, results, fields) {
            if (error) throw error;

            console.log('getStockHistory result: ', results);

            res.send({history: results});
            return results;
    });
});

router.get('/getStockList', (req, res) => {
    connection.query('SELECT distinct Stock_Name FROM stocks order by Stock_Name ASC',
    function (error, results, fields) {
        if (error) throw error;

        console.log('getStockList result: ', results);

        res.send({list: results});
        return results;
    });
});

module.exports = router;
