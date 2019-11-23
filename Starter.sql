create database Brokerage;
use Brokerage;

CREATE TABLE `brokerage`.`stocks` (
  `idStocks` INT NOT NULL AUTO_INCREMENT,
  `Stock_Name` VARCHAR(45) NULL,
  `Price` DOUBLE NULL,
  `Timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Company` VARCHAR(100) NULL,
  PRIMARY KEY (`idStocks`));



CREATE TABLE `brokerage`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `email_id` VARCHAR(20) NOT NULL,
  `balance` DOUBLE NULL DEFAULT 0,
  PRIMARY KEY (`idUser`));

CREATE TABLE `brokerage`.`transaction` (
  `idtransaction` INT NOT NULL AUTO_INCREMENT,
  `userid` VARCHAR(45) NULL,
  `stockid` VARCHAR(45) NULL,
  `buy_sell_flag` VARCHAR(5) NULL,
  `time` TIMESTAMP NULL,
  `num_stocks` INT NULL,
  PRIMARY KEY (`idtransaction`));
  
  
  CREATE TABLE `brokerage`.`current_stocks` (
  `userid` INT NOT NULL,
  `stockid` INT NOT NULL,
  `num_stocks` INT NULL,
  `num_recur_days_sell` INT NULL DEFAULT -1,
  `num_recur_days_buy` INT NULL DEFAULT -1,
  `num_stocks_sell` INT NULL DEFAULT 0,
  `num_stocks_buy` INT NULL DEFAULT 0,
  PRIMARY KEY (`userid`, `stockid`));


CREATE TABLE `brokerage`.`bank` (
  `idbank` INT NOT NULL AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `account_no` VARCHAR(20) NULL,
  `routing_no` VARCHAR(20) NULL,
  PRIMARY KEY (`idbank`, `userid`));
