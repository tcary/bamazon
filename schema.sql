DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
id AUTO_INCREMENT NOT NULL,
product VARCHAR(100) NOT NULL,
department VARCHAR(100) NOT NULL,
price DECIMAL(10, 4) NOT NULL,
stock_q INT NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, stock_q)
VALUES ("Vacuum", "appliances", 276.99, 784)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Fridge", "appliances", 1399.97, 76)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Washer", "appliances", 698.97, 164)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Dryer", "appliances", 698.97, 178)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Bread maker", "appliances", 134.25, 46)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Coffee maker", "appliances", 43.99, 1098)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Blender", "appliances", 324,99, 256)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Mixer", "appliances", 32.97, 8)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Microwave oven" "appliances", 260.98, 34)
INSERT INTO products(product, department, price, stock_q)
VALUES ("Stove", "appliances", 999.99, 995)

SELECT * FROM products