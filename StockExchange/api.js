'use strict';

const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'stocks',
    password : 'WPL6314',
    database : 'brokerage'
  });

router.get('/getLatestStockPrice', (req,res) => {
    connection.query(`SELECT Price As price, Timestamp as timestamp FROM stocks WHERE Stock_Name = '${req.body.symbol}' ORDER BY Timestamp DESC Limit 1`,
        function (error, results, fields) {
            if (error) throw error;

            console.log('Query result: ', results);

            res.send(results[0]);
            return results;
    });
});

router.get('/getStockHistory', (req, res) => {
    connection.query(`SELECT Price As price, Timestamp as timestamp FROM stocks WHERE Stock_Name = '${req.body.symbol}' ORDER BY Timestamp DESC`,
        function (error, results, fields) {
            if (error) throw error;

            console.log('Query result: ', results);

            res.send({history: results});
            return results;
    });
});

module.exports = router;