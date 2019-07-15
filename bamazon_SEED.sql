DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales INTEGER NULL,
    PRIMARY KEY (id)
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INTEGER(10) NOT NULL,
    product_sales INTEGER(10) NULL,
    total_profit INTEGER(10) NULL,
    PRIMARY KEY (id)
);

-- Seed products table data
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("television", "electronics", 500.00, 50, 70),
("video game console", "electronics", 250.00, 20, 40),
("stand mixer", "kitchen", 300.00, 25, 35),
("dish set", "kitchen", 80.00, 40, 95),
("arm chair", "furniture", 225.00, 10, 35),
("dresser", "furniture", 450.00, 15, 30),
("dress", "women's clothing", 80.00, 200, 500),
("blazer", "men's clothing", 120.00, 175, 370),
("board game", "toys", 25.00, 210, 600),
("doll house", "toys", 45.00, 75, 100);        

-- Seed departments table data
INSERT INTO departments (department_name, over_head_costs)
VALUES ("electronics", 10000),
("kitchen", 5000),
("furniture", 20000),
("women's clothing", 15000),
("men's clothing", 12000),
("toys", 17000),
("outdoors", 7000),
("pet", 3000);