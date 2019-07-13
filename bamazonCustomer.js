var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'bamazon'
  });
   
  connection.connect();
   
  connection.query('SELECT * FROM products', function (error, results) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
   
  connection.end();