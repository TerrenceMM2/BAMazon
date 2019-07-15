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
    name: "supervisorAction",
    message: "Supervisor Menu:",
    choices: [
        "View Products Sales by Department",
        "Create New Department",
    ]
}]).then(answers => {
    switch (answers.supervisorAction) {
        case "View Products Sales by Department":
            getProducts();
            break;
        case "Create New Department":
            createdDept()
            break;
    };
});

function getProducts() {
    connection.connect();

    connection.query('SELECT * FROM departments', function (error, results) {
        if (error) throw error;
        var results = results;
        var data = [];
        for (var i = 0; i < results.length; i++) {
            data.push({
                department_id: results[i].id,
                department_name: results[i].department_name,
                over_head_costs: results[i].over_head_costs,
                product_sales: results[i].product_sales,
                total_profit: results[i].total_profit
            });
        };
        var columns = columnify(data, {
            columnSplitter: " | "
        });
        console.log("\n" + columns + "\n");
    });

    connection.end();
};

function createdDept() {

}