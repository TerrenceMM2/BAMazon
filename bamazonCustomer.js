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

    connection.end();
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
    console.log("I would like to purchase " + answers.quantity + " " + answers.productId + ".");
})
}