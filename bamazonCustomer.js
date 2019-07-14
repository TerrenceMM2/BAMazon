var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

getProducts();

function getProducts() {
    connection.connect();

    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        var results = results;
        var data = [];
        for (var i = 0; i < results.length; i++) {
            data.push({
                product_id: results[i].id,
                product_name: results[i].product_name,
                product_department: results[i].department_name,
                product_price: results[i].price,
                product_quantity: results[i].stock_quantity
            });
        };
        var columns = columnify(data, {
            columnSplitter: " | "
        });
        console.log(columns);
        productSearch();
    });
};

function productSearch() {
    inquirer.prompt([{
            type: "input",
            name: "productId",
            message: "Please input the ID of the product you would like to purchase."
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to purchase?"
        }
    ]).then(answers => {
        makePurchase(answers.productId, answers.quantity);
    });
};

function makePurchase(num1, num2) {
    var num1 = parseInt(num1);
    var num2 = parseInt(num2);

    connection.query('SELECT * FROM products WHERE id = ?', [num1], function (error, results) {
        if (error) throw error;
        var results = results[0];
        var currentStock = results.stock_quantity;
        if (currentStock < num2) {
            console.log("Insufficient quantity!");
            console.log(">>> Canceling order");
            connection.end();
        } else {
            var updateStock = currentStock - num2;
            connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [updateStock, num1]);
            console.log("Order placed!");
            var orderTotal = results.price * num2;
            console.log("Order total = $" + orderTotal);
            console.log("Thank you for your business.");
            connection.end();
        };
    });
};