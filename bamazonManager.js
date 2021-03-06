require('dotenv').config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_INSTANCE
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
    switch (answers.adminAction) {
        case "View Products for Sale":
            getProducts();
            break;
        case "View Low Inventory":
            lowInventory();
            break;
        case "Add to Inventory":
            addInventory();
            break;
        case "Add New Product":
            addProduct();
            break;
    };
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
        console.log("\n" + columns);
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
        console.log("\n" + columns);
    });

    connection.end();

};

function addInventory() {
    connection.connect();

    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        var results = results;
        var data = [];
        for (var k = 0; k < results.length; k++) {
            data.push({
                product_id: results[k].id,
                product_name: results[k].product_name,
                product_department: results[k].department_name,
                product_price: results[k].price,
                product_quantity: results[k].stock_quantity
            });
        };
        var columns = columnify(data, {
            columnSplitter: " | "
        });
        console.log("\n" + columns + "\n");
        specifyProduct();
    });
};

function specifyProduct() {
    inquirer.prompt([{
            type: "input",
            name: "productId",
            message: "Please enter the Product ID."
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to add?"
        }
    ]).then(answers => {
        updateInventory(answers.productId, answers.quantity);
    });
};

function updateInventory(num1, num2) {
    var num1 = parseInt(num1);
    var num2 = parseInt(num2);

    connection.query('SELECT * FROM products WHERE id = ?', [num1], function (error, results) {
        if (error) throw error;
        var results = results[0];
        var currentStock = results.stock_quantity;
        var updateStock = currentStock + num2;
        connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [updateStock, num1], function (error) {
            if (error) throw error;
        });
        connection.end();
        console.log("\nInventory updated!");
    });
};

function addProduct() {
    connection.connect();

    connection.query("SELECT department_name FROM departments", function (error, results) {
        if (error) throw error;
        var departmentsArr = [];
        for (var l = 0; l < results.length; l++) {
            departmentsArr.push(results[l].department_name);
        };

        inquirer.prompt([{
                type: "input",
                name: "productName",
                message: "Please input the product name."
            },
            {
                type: "input",
                name: "productPrice",
                message: "Please input the product price.",
                validate: function (value) {
                    var pass = value.match(/^\d+(\.\d{1,2})?$/);
                    if (pass) {
                        return true;
                    };
                    return "Please enter price as dd.cc (ex. 9.99) - up to 9999999999.99.";
                }
            },
            {
                type: "list",
                name: "department",
                message: "Please select a department.",
                choices: departmentsArr
            },
            {
                type: "input",
                name: "productQuantity",
                message: "Please input the product quantity."
            }
        ]).then(answers => {
            var newProduct = {
                product_name: answers.productName,
                department_name: answers.department,
                price: answers.productPrice,
                stock_quantity: answers.productQuantity
            };

            connection.query("INSERT INTO products SET ?", [newProduct], function (error, results) {
                if (error) throw error;
                console.log("\nProduct added!");
            })

            connection.end();
        });
    });
};