const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
  });
const promptUser = function() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products For Sale",
        "View Low Inventory",
        "Add To Inventory",
        "Add New Product"
      ]
    })
    .then(function(choice) {
        switch(choice.action) {
            case "View Products For Sale":
            listProducts();
            break;

            case "View Low Inventory" :
            viewLowInventory();
            break;
            
            case "Add To Inventory":
            addToInventory();
        }
    });
}

promptUser();

const listProducts = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("Logging all items in Database:");
        res.forEach(elem => {
            console.log("Item ID: " + elem.item_id);
            console.log("Product Name: " + elem.product_name);
            console.log("Price: " + elem.price);
            console.log("--------------");
        });
    });
}

const viewLowInventory = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;

        res.forEach(elem => {
            if(elem.stock_quantity <= 5) {
                console.log(elem.product_name);
            }
        });
    });
}

const addToInventory = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        inquirer
        .prompt({
        name: "action",
        type: "list",
        message: "Which item would you like product would you like to select?",
        choices: [
            "View Products For Sale",
            "View Low Inventory",
            "Add To Inventory",
            "Add New Product"
        ]
        })
    });
}