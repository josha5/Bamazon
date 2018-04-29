const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
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
    // run the start function after the connection is made to prompt the user
    console.log("connected to database"); 
    listProducts();
    getOrder();
});

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


const getOrder = function() {
    inquirer
    .prompt([{
        name: "itemID",
        type: "input",
        message: "What is the ID of the item you are looking to buy?",
    },
    {
        name: "quantity",
        type: "input",
        message: "How many units would you like to purchase?"
    },
    ])
    .then(function(answer) {
        var item = answer.itemID;
        var quantity = answer.quantity;
        connection.query('SELECT * FROM products WHERE ?', {item_id: item}, function(err, res) {
            if(err) throw err;
            
            if(res.length === 0) {
                console.log("Please choose a valid item ID.");
            } else {
                console.log("You selected Item: " + res[0].product_name);

                if(quantity <= res[0].stock_quantity) {

                    var updateStock = 'UPDATE products SET stock_quantity = ' + (res[0].stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateStock, function(err, data) {
						if (err) throw err;
                        
                        console.log('Your order total is $' + res[0].price * quantity);
                        console.log("Iphone 10X units left:" + res[0].stock_quantity);
						// End the database connection
						connection.end();
					})
                } else {
                    console.log("Sorry we don't have enough stock to fulfill your order.");
                }
            }
        });
    });
}




// const matchItem = function(answer) {
//     console.log(answer.itemID);
//     connection.query("SELECT * FROM products", function(err, res) {
//         if (err) throw err;
//         res.forEach(elem => {
//             if(elem.item_id == answer.itemID) {
//                 console.log("Product Selected: " + elem.product_name);
//                 inquirer
//                 .prompt({
//                     name: "stock",
//                     type: "input",
//                     message: "How many units of this product would you like to buy?" 
//                 })
//                 .then(function(answer) {
//                     var queryStr = 'UPDATE products SET stock_quantity = ' + elem.stock_quantity;
//                     connection.query(queryStr, function(err, data) {
//                         console.log(elem.stock_quantity);
//                     })
//                         // console.log("You bought " + answer.stock + " units!");
//                         // console.log("Units left: " + elem.stock_quantity);   
//                 });
//             }
//         });
//         connection.end();
//     });
// }

  