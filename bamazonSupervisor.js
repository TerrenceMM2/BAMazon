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
            createDept()
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
            var totalProfit = results[i].product_sales - results[i].over_head_costs;
            data.push({
                department_id: results[i].id,
                department_name: results[i].department_name,
                over_head_costs: results[i].over_head_costs,
                product_sales: results[i].product_sales,
                total_profit: totalProfit
            });
        };
        var columns = columnify(data, {
            columnSplitter: " | "
        });
        console.log("\n" + columns + "\n");
    });

    connection.end();
};

function createDept() {
    inquirer.prompt([{
            type: "input",
            name: "deptName",
            message: "Please enter the name of the new department."
        },
        {
            type: "input",
            name: "deptCosts",
            message: "Please enter the overhead costs of the new department.",
            validate: function (value) {
                var pass = value.match(/^[0-9]*$/);
                if (pass) {
                    return true;
                };
                return "Please enter price as dd.cc (ex. 9.99) - up to 9999999999.99.";
            }
        }
    ]).then(answers => {
        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)", [answers.deptName, answers.deptCosts], function (error, results) {
            if (error) throw error;
            console.log("\nNew Department Added!");
        });
        connection.end();
    });
};