DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("television", "electronics", 500.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("video game console", "electronics", 250.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("stand mixer", "kitchen", 300.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dish set", "kitchen", 80.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("arm chair", "furniture", 225.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dresser", "furniture", 450.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dress", "women's clothing", 80.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blazer", "men's clothing", 120.00, 175);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("board game", "toys", 25.00, 210);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("doll house", "toy", 45.00, 75);