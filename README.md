# BAMazon

## Purpose  

This node app simulates an online store with custom, manager, and supervisor functionality.  

## Installation  

**PLEASE NOTE: This application requires a MySQL database**

1. Clone this repo to your local machine.  

   ```$ git clone https://github.com/TerrenceMM2/coursework10-bamazon.git```  

2. Run `npm install` to install the application's dependencies.  

   ```$ npm install``` 

3. Create an `.env` file in the application's home directory with the following information: 

   ```
   DB_HOST=<db_hostname>
   DB_INSTANCE=<db_instance_name>
   DB_USERNAME=<db_username>
   DB_PASSWORD=<db_username_password>
   ```

4. Using the `bamazon_SEED.sql` file, seed your MySQL database.

## Instructions  

The bamazon app comes with 3 modules - Customer, Manager, & Supervisor - each with its own functionality.

#### Customer  

1. Execute `node bamazonCustomer`.  

2. To make a purchase, enter a value available from the PRODUCT_ID column.  

3. Enter the purchase quantity.  

#### Manager  

1. Execute `node bamazonManager`.  

2. Choose from one of the following options:
   1. `View Products for Sale`
   2. `View Low Inventory`
   3. `Add to Inventory`
   4. `Add New Product`

##### `View Products for Sale`

Outputs all products currently available for purchase with the following information: product_id, product_name, department, price, and quantity.  

##### `View Low Inventory`  

Outputs only products that have less than 5 available units left.  

##### `Add to Inventory`  

Outputs the current product inventory and prompt the manager to supply the following values:
  1. Product ID of the item to be resupplied.
  2. Number of units to add.

##### `Add New Product`

Prompts the manager to supply the following values:
  1. New product name.  
  2. Price of the new product.
  3. Choose from a list of available departments where the item will be categorized.  
  4. Quantity for the new product.  

#### Supervisor  

1. Execute `node bamazonSupervisor`.  

2. Choose from one of the following options:
   1. `View Products Sales by Department`
   2. `Create New Department`

##### `View Products Sales by Department`  

Outputs all departments and their stats: department_id, department_name, overhead costs, sales, and profit.  

##### `Create New Department`  

Prompts the supervisor to supply the following values:
  1. New department name.  
  2. Overhead costs for the new department.

- - -

### Demo

<a href="https://youtu.be/K5pBXHEOusA" target="_blank">
   Demo Video
   <img src="../media/bamazon-screenshot.png" alt="Demo Video Screenshot"/></a>

- - -

### Contribute  

To get started ...

**Step 1**

- **Option 1** - 🍴 Fork this repo!

- **Option 2** - 👯 Clone this repo to your local machine using `https://github.com/TerrenceMM2/coursework10-bamazon.git`

**Step 2** - **HACK AWAY!** 🔨🔨🔨

**Step 3** - 🔃 Create a new pull request using [https://github.com/TerrenceMM2/coursework10-bamazon/compare](https://github.com/TerrenceMM2/coursework10-bamazon/compare)

- - -

### Built With
1. [node](https://nodejs.org/en/)
2. [MySQL](https://www.mysql.com/)
3. [inquirer](https://www.npmjs.com/package/inquirer)
4. [mysql(npm)](https://www.npmjs.com/package/mysql)
5. [dotenv](https://www.npmjs.com/package/dotenv)
6. [columnify](https://www.npmjs.com/package/columnify)

- - -

### Authors
* **Terrence Mahnken** - [LinkedIn](https://www.linkedin.com/in/terrencemahnken/) | [Twitter](https://twitter.com/TerrenceMahnken)
