var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as id + ${connection.threadId}`);
    // prompt();
});

function prompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "continue",
        message: "Would you like to buy an item?",
        default: true

    }]).then(function (user) {
        if (user.continue === true) {
            userPurchase();
        } else {
            console.log("Too bad! Come back when you are ready!");
        }
    });
}



var display = function () {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["id", "product", "department", "price", "stock_q"],
            colWidths: [10, 25, 25, 14, 14]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product, res[i].department, res[i].price, res[i].stock_q]
            );
        }
        console.log(table.toString());
        prompt();
        // userPurchase();
    })
}

function userPurchase() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter the Item ID which you would like to purchase.",
            validate: function (value) {
                if (!isNaN(value)) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function (value) {
                if (!isNaN(value)) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (input) {
        var item = input.id;
        var quantity = input.stock_q;
        // purchase(item, quantity);
        var queryStr = "SELECT * FROM products WHERE ?";
        connection.query(queryStr, { id: item }, function (res, err) {
            if (err) throw err;
            if (res.length === 0) {
                console.log(`ERROR: Invalid item id, please use a valid item id`);
                display();
            } else {
                var productData = data[0];
                if (quantity <= productData.stock_q) {
                    console.log("Congrats! The product you requested is in stock! Placing your order!");
                    var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_q - quantity) + " WHERE id = " + item;
                    connection.query(updateQueryStr, function (err, res) {
                        console.log(`Your oder has been placed! Your total is $ + ${productData.price * quantity}`);
                        console.log("Thank you for shopping with us!");
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    })
                } else {
                    console.log("Sorry, there is not enough product in stock, your order can not be placed as is.");
                    console.log("Please modify your order quantity.");
                    console.log("\n---------------------------------------------------------------------\n");

                    display();
                }
            }
        })


    });
};
display();