'use strict';

const express = require('express');
const router = express.Router();
const ExchangeService = require('./exchangeService');

const exchangeService = new ExchangeService();

router.get('/getStockPrice', (req,res) => {
    let result = exchangeService.getStockPrice(req.body.symbol);
    res.send(result);
    return result;
});

module.exports = router;