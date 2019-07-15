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

function addInventory() {
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
            // Used to validate that the user only inputs a letter character and only one.
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
        choices: ["men's clothing", "women's clothing", "kid's clothing", "baby", "home", "kitchen", "furniture", "electronics", "toys", "outdoors", "sport & fitness", "health & beauty", "grocery & household", "pet", "seasonal"]
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
        }
        // var pname = answers.productName;
        // var price = answers.productPrice;
        // var dept = answers.department;
        // var pquant = answers.productQuantity;

        connection.connect();

        connection.query("INSERT INTO products SET ?", [newProduct], function (error, results) {
            if (error) throw error;
            console.log("\nProduct added!");
        })

        connection.end();
    });
}