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
        console.log("Add to Inventory")
        menuOptions();
      }
      else if(answer.menu === "Add New Product") {
        console.log("Add New Product")
        menuOptions();
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
        "SELECT * FROM products WHERE ? BETWEEN ? AND ?",
        [
                "stock_quality", 0, 100
        ],
        function(err, res) {
        if (err) throw err;
        console.log(res);
    })
}

function viewInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    })
}

// function placeOrder() {
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     inquirer
//     .prompt([
//         {
//             name: "id",
//             type: "input",
//             message: "What is the ID of the item you would like to buy?",
//         },
//         {
//             name: "qty",
//             type: "input",
//             message: "How many units would you like to buy?"
//         }
//     ])
//     .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < res.length; i++) {
//             if (answer.id == res[i].id) {
//                 chosenItem = res[i];
//                 // determine if there is enough inventory in stock
//                 if (chosenItem.stock_quality > parseInt(answer.qty)) {
//                     // There is enough in stock so process the , so update db, let the user know, and start over
//                     var newStock = chosenItem.stock_quality - answer.qty
//                     connection.query(
//                         "UPDATE products SET ? WHERE ?",
//                         [
//                             {
//                                 stock_quality: newStock
//                             },
//                             {
//                                 id: chosenItem.id
//                             }
//                         ],
//                         function(error) {
//                             if (error) throw err;
//                             var total = chosenItem.price * answer.qty
//                             console.log("Your Order has been placed! You owe $" + total +". The new stock number is " + newStock)
//                             continueShopping();
//                         }
//                     );
//                 }
//                 else {
//                     // bid wasn't high enough, so apologize and start over
//                     console.log("Insufficient Quantity! Sorry, our current inventory for this product is " + chosenItem.stock_quality + ". Please enter a lower quantity.");
//                     // start();
//                     continueShopping();
//                 }
//             }
//         }
//     })    

//   });
// }