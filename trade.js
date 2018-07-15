// Require inquirer and fs package
var inquirer = require("inquirer");
var fs = require("fs");

// "newEntryTrade()" function
// This function runs when the user wants to create a new entry (buy) trade. By using inquirer, the user is prompted for their initial 
// investment, the price of Bitcoin when they bought, the name of the altcoin they bought, and the price of the altcoin they bought 
// (altcoin price is in BTC). This function assumes you are buying BTC on Coinbase with a 4% purchase fee and a 0.000014 BTC transfer fee 
// to altcoin exchange.
function newEntryTrade() {
    inquirer.prompt([
        {
            type: "input",
            name: "investment",
            message: "Enter total investment: "
        },
        {
            type: "input",
            name: "btcPrice",
            message: "Enter Bitcoin price: "
        },
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin bought: "
        },
        {
            type: "input",
            name: "altPrice",
            message: "Enter price of altcoin (in BTC): "
        }
    ]).then(function (response) {
        var totalBTC = parseFloat(response.investment) / parseFloat(response.btcPrice);
        var actualBTC = totalBTC - (totalBTC * .04);
        var transferredBTC = actualBTC - 0.000014;
        var totalCoins = transferredBTC / parseFloat(response.altPrice);
        var entryPrice = parseFloat(response.investment) / totalCoins;
        var output = "* New entry *\nCryptocurrency: " + response.altName + "\nInitial investment: $" + response.investment +
            "\nBTC Price bought at: $" + response.btcPrice + " per BTC\nBought " + response.altName + " at: " + response.altPrice +
            " BTC\nTotal coins bought: " + totalCoins + " " + response.altName + "\nEntry price: $" + entryPrice +
            " (factoring in Coinbase fee & transfer fees)\n";
        console.log(output);
        fs.appendFile('./log.txt', output + "\n", function (error) {
            if (error) throw error;
        });
    });
};

// This function is incomplete
// "newExitTrade()" function
// This function runs when the user wants to create a new exit (sell) trade. By using inquirer, the user is prompted for the name of the 
// altcoin they sold, the price they sold the altcoin at (altcoin price is in BTC), [comment needs to be completed]
function newExitTrade() {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin sold: "
        },
        {
            type: "input",
            name: "altPrice",
            message: "Enter price altcoin was sold at (in BTC): "
        }
        // User still needs to input other parameters to complete function (coins sold, and btcPrice sold)
    ]).then(function (response) {
        var output = "* New exit *\nCryptocurrency: " + response.altName + "\nPrice sold at (in BTC): " + response.altPrice + "\n";
        console.log(output);
    });
};

// Function returns the average entry price of all investments made
// This function is simply a blueprint for now
// function getEntryAverage(allEntries) {
//     var total = 0;
//     for (var i = 0; i < allEntries.length; i++) {
//         total = total + allEntries[i];
//     };
//     var avgEntry = total / allEntries.length;
//     // // Display average entry price
//     console.log("Average entry price: " + avgEntry);
//     return avgEntry;
// };

// Main prompt: ask user for command to start proceed
inquirer.prompt([
    {
        type: "list",
        name: "command",
        message: "What would you like to do?",
        choices: ["Make new entry trade", "Make new exit trade"]
    }
]).then(function (response) {
    var userCommand = response.command;
    console.log(userCommand);
    switch (userCommand) {
        case "Make new entry trade":
            newEntryTrade();
            break;
        case "Make new exit trade":
            newExitTrade();
            break;
    };
});
