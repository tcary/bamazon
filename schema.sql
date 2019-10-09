DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
id INT AUTO_INCREMENT NOT NULL,
product VARCHAR(100) NOT NULL,
department VARCHAR(100) NOT NULL,
price DECIMAL(10, 4) NOT NULL,
stock_q INT NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, stock_q)
VALUES ("Vacuum", "appliances", 276.99, 784),
("Fridge", "appliances", 1399.97, 76),
("Washer", "appliances", 698.97, 164),
("Dryer", "appliances", 698.97, 178),
("Bread maker", "appliances", 134.25, 46),
("Coffee maker", "appliances", 43.99, 1098),
("Blender", "appliances", 324.99, 256),
("Mixer", "appliances", 32.97, 8),
("Microwave oven", "appliances", 260.98, 34),
("Stove", "appliances", 999.99, 995);

SELECT * FROM products;