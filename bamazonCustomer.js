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

// function display() {
//     console.log(connection.query);
//     connection.query("SELECT * FROM products", function (error, res) {
//         console.table(res);
//         console.log(res)
//     })
// }



var display = function () {
    // var query = "SELECT * FROM products";
    connection.query("SELECT * FROM products", function (err, res) {
        // console.table(res);
        if (err) throw err;
        var table = new Table({
            head: ["Id", "Product Name", "Department Name", "Price", "Stock quantity"],
            colWidths: [10, 20, 20, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([
                res[i].id,
                res[i].product,
                res[i].department,
                res[i].price,
                res[i].stock_q
            ]
            );
        }
        console.log(table.toString());
        prompt();
        // userPurchase();
    })
}

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
        var id = input.id;
        var quantity = input.quantity;
        purchaseOrder(id, quantity);
    });
};

function purchaseOrder(id, quantity) {
    // var quantity = input.stock_q;
    var queryStr = "SELECT * FROM products WHERE ?";
    connection.query(queryStr, { id: id }, function (err, res) {
        // console.log(res);
        // console.log(quantity);
        if (err) throw err;
        // if (res.length === 0) {
        //     console.log(`ERROR: Invalid item id, please use a valid item id`);
        //     display();
        // } else {
        //     var productData = input[0];}
        if (quantity <= res[0].stock_q) {
            console.log("Congrats! The product you requested is in stock! Placing your order!");
            console.log(res[0].stock_q - quantity);
            var updateQueryStr = "UPDATE products SET stock_q = " + (res[0].stock_q - quantity) + " WHERE id = " + id;
            connection.query(updateQueryStr, function (err, res1) {
                if (err) throw err;
                // console.log(res1);
                var total = res[0].price * quantity;
                console.log(`Your oder has been placed! Your total is $${total}`);
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

    })
}
display();