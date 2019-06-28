DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
 id INTEGER NOT NULL auto_increment,
 product_name VARCHAR (250) NOT NULL,
 department_name VARCHAR (50) NOT NULL,
 price DECIMAL (5,2) NOT NULL,
 stock_quality INT NOT NULL,
 PRIMARY KEY (id)
);

