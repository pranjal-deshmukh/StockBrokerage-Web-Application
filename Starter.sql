create database Brokerage;


use Brokerage;


CREATE TABLE `brokerage`.`stocks` (
  `idStocks` INT NOT NULL AUTO_INCREMENT,
  `Stock_Name` VARCHAR(45) NULL,
  `Price` DOUBLE NULL,
  `Timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Company` VARCHAR(100) NULL,
  PRIMARY KEY (`idStocks`));



select * from stocks;
