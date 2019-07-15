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
        console.log("\n" + columns + "\n");
        productSearch();
    });
};

function productSearch() {
    inquirer.prompt([{
            type: "input",
            name: "productId",
            message: "Please input the ID of the product you would like to purchase.",
            validate: function (value) {
                var pass = value.match(/^[0-9]*$/);
                if (pass) {
                    return true;
                };
                return "Please enter a value from the PRODUCT_ID column.";
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to purchase?",
            validate: function (value) {
                var pass = value.match(/^[0-9]*$/);
                if (pass) {
                    return true;
                };
                return "Please enter a valid numeric quantity.";
            }
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
        var department = results.department_name;
        var productPrice = parseInt(results.price);
        var salesTotal = productPrice * num2;
        var currentStock = results.stock_quantity;
        if (currentStock < num2) {
            console.log("\nInsufficient quantity!");
            console.log(">>> Canceling order");
            connection.end();
        } else {
            var updateStock = currentStock - num2;
            connection.query('SELECT * FROM departments WHERE department_name = ?', [department], function (error, results) {
                if (error) throw error;
                var productSales = results[0].product_sales;
                var totalProfit = results[0].total_profit;
                var overHead = results[0].over_head_costs;
                
                if (productSales === null) {
                    productSales = 0;
                };
                if (totalProfit === null) {
                    totalProfit = 0;
                };
                var newTotals = productSales + salesTotal;
                totalProfit = newTotals - overHead;
                connection.query("UPDATE departments SET product_sales = ?, total_profit = ? WHERE department_name = ?", [newTotals, totalProfit, department], function (error, results) {
                    if (error) throw error;
                });
                connection.end();
            });
            connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [updateStock, num1]);
            console.log("\nOrder placed!");
            var orderTotal = results.price * num2;
            console.log("\nOrder total = $" + orderTotal);
            console.log("\nThank you for your business.");
        };
    });
};