# Homework 10 - Node.js & MySQL

* Please install mysql and inquirer to run this application.
* Please use included schema.sql and seeds.sql files to create the bamazon_DB.
* Please connect to the mysql bamazon_DB with your credentials before trying to place an order, view or update inventory, or reviewing profit by department. 

## bamazonCustomer.js
* Upon launch of the javascript file, the user will be shown the list of products available.
* User will be asked what the ID is of the product that they would like to purchase.
* User will be asked what quantity of units they would like to purchase of that product.
    * If the requested amount is available, the order will be processed (database is updated with newStock number) and the user will be shown the total due.
    * If the requested amount is not avaiable, the order is not processed and the user is provided a message stating the avaiable stock number and asked to request a lower number.
* Once the user has submitted an order, regardless of whether it was processed, they are asked whether they want to [ORDER] again to continue shopping (Go to the beginning of the order process) or [EXIT] the application.

## bamazonManager.js
* Upon launch the Manager will be asked what course of action they want to take:
    * View Inventory - Shows all current inventory by id, name, price, and stock_quantity.
    * View Low Inventory - Shows all current inventory with a stock_quantity less than 5 units.
    * Add Inventory - Inquires as to which product by ID should be updated and how many units should be added to the current inventory.
    * Add New Product - Allows Managers to enter a new product by entering the product name, product department, price, and stock_quantity. Note: Product ID is assigned automatically based on the last unique id entered.
    * Exit - Allows the Manager to exit the application.
* Each option ends with the menuOptions being offered up again to allow the Manager to navigate to other areas or make multiple updates.
