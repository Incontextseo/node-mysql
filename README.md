# Homework 10 - Node.js & MySQL

* Please install mysql and inquirer to run this application.
* Please use included schema.sql and seeds.sql files to create the bamazon_DB.
* Please connect to the mysql DB with your credentials before trying to place an order.

## bamazonCustomer.js
* Upon launch of the javascript file, the user will be shown the list of products available.
* User will be asked what the ID is of the product that they would like to purchase.
* User will be asked what quantity of units they would like to purchase of that product.
    * If the requested amount is available, the order will be processed (database is updated with newStock number) and the user will be shown the total due.
    * If the requested amount is not avaiable, the order is not processed and the user is provided a message stating the avaiable stock number and asked to request a lower number.
* Once the user has submitted an order, regardless of whether it was processed, they are asked whether they want to [ORDER] again to continue shopping (Go to the beginning of the order process) or [EXIT] the application.

## bamazonManager.js