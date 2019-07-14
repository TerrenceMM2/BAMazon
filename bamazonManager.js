var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

inquirer.prompt([{
    type: "list",
    name: "adminAction",
    message: "Admin Menu:",
    choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ]
}]).then(answers => {
    console.log(answers);
    switch (answers.adminAction) {
        case "View Products for Sale":
            getProducts();
            break;
        case "View Low Inventory":
            lowInventory();
            break;
        case "Add to Inventory":
            break;
        case "Add New Product":
            break;
    }
});

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
    });

    connection.end();

};

function lowInventory() {

    connection.connect();

    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (error, results) {
        if (error) throw error;
        var results = results;
        var data = [];
        for (var j = 0; j < results.length; j++) {
            data.push({
                product_id: results[j].id,
                product_name: results[j].product_name,
                product_department: results[j].department_name,
                product_price: results[j].price,
                product_quantity: results[j].stock_quantity
            });
        };
        var columns = columnify(data, {
            columnSplitter: " | "
        });
        console.log(columns);
    });

    connection.end();

};