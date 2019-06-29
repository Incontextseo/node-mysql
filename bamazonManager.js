var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  menuOptions();
});

function menuOptions() {
    inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product","Exit"]
    })
    .then(function(answer) {
      // based on their answer, either call the order function or end connection
      if (answer.menu === "View Products for Sale") {
        console.log("View Products for Sale")
        viewInventory();
        menuOptions();
      }
      else if(answer.menu === "View Low Inventory") {
        // console.log("View Low Inventory")
        lowInventory();
        menuOptions();
      }
      else if(answer.menu === "Add to Inventory") {
        // console.log("Add to Inventory")
        addInventory();
      }
      else if(answer.menu === "Add New Product") {
        console.log("Add New Product")
        createProduct();
      }
      else {
          console.log("Thank you. Have a nice day!")
          connection.end();
      }
    });
};

function lowInventory() {
    console.log("lowInventory function")
    connection.query(
        "SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?",
        [
            0, 100
        ],
        function(err, res) {
        if (err) throw err;
        console.log(res);
    })
};

function viewInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    })
};

function addInventory() {
    // console.log("Inserting a new product...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: "update_id",
                type: "input",
                message: "What is ID of the product where you want to add inventory?",
            },
            {
                name: "update_inventory",
                type: "input",
                message: "How much inventory are you adding?",
            }
        ])
        .then(function(answer) {
            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (answer.update_id == res[i].id) {
                    chosenItem = res[i];
                var newStock = chosenItem.stock_quantity + parseInt(answer.update_inventory)
                console.log(newStock)
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                        {
                            stock_quantity: newStock, 
                        },
                        {
                            id: answer.update_id, 
                        }],
                        function(err, res) {
                        console.log(res.affectedRows + " product inserted!\n");
                        if (err) throw err;
                        console.log(res);
                        menuOptions();
                        }
                    )
                }
            } 
        })
    })
}

function createProduct() {
    console.log("Inserting a new product...\n");
    inquirer
    .prompt([
        {
            name: "product",
            type: "input",
            message: "What is the name of the product?",
        },
        {
            name: "department",
            type: "input",
            message: "What is the product's department?",
        },
        {
            name: "price",
            type: "input",
            message: "What is the product's price per unit?",
        },
        {
            name: "stock",
            type: "input",
            message: "How many units are available for sale?"
        }
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: answer.product, 
              department_name: answer.department, 
              price: answer.price, 
              stock_quantity: answer.stock,
            },
            function(err, res) {
              console.log(res.affectedRows + " product inserted!\n");
              if (err) throw err;
              console.log(res);
              menuOptions();
            }
        )  
    })
}