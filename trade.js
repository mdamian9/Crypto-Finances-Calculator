// Require npm inquirer, npm moment and npm fs packages
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");

// "newEntryTrade()" function
// This function runs when the user wants to create a new entry (buy) trade. By using inquirer, the user is prompted for their initial 
// investment, the price of Bitcoin when they bought, the name of the altcoin they bought, and the price of the altcoin they bought 
// (altcoin price is in BTC). This function assumes the user is buying BTC on Coinbase with a 4% purchase fee, a 0.000014 BTC transfer fee 
// to altcoin exchange, and a 0.1% purchase fee at the altcoin exchange when buying an altcoin.
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
            message: "Enter Bitcoin price (bought): "
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
        var exchFee = totalCoins * .001;
        var actualCoins = totalCoins - exchFee;
        var entryPrice = parseFloat(response.investment) / actualCoins;
        var output = "* New entry *\nCryptocurrency: " + response.altName + "\nInitial investment: $" + response.investment +
            "\nBought Bitcoin at: $" + response.btcPrice + " per BTC\nBought " + response.altName + " at: " + response.altPrice +
            " BTC\nTotal coins bought: " + actualCoins + " " + response.altName + "\nEntry price: $" + entryPrice +
            " (factoring in Coinbase fee, transfer fee and Binance fee)\nDate (trade log): " +
            moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./entries.txt', output + "\n", function (error) {
            if (error) throw error;
        });
    });
};

// "newExitTrade()" function
// This function runs when the user wants to create a new exit (sell) trade. By using inquirer, the user is prompted for the name of the 
// altcoin they sold, the amount of conis / tokens they sold, the price they sold the altcoin at (altcoin price is in BTC), then the price
// they sold Bitcoin at in the end. This function assumes the user is selling altcoin on altcoin exchange with a 0.1% trade fee, charged a 
// 0.000014 BTC transfer fee to Coinbase, and a 4% trade fee at Coinbase when selling Bitcoin.
function newExitTrade() {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin sold: "
        },
        {
            type: "input",
            name: "numCoinsSold",
            message: "Enter amount of coins / tokens sold: "
        },
        {
            type: "input",
            name: "altPrice",
            message: "Enter price altcoin was sold at (in BTC): "
        },
        {
            type: "input",
            name: "btcPrice",
            message: "Enter Bitcoin price (sold): "
        }
    ]).then(function (response) {
        var totalBTC = response.numCoinsSold * response.altPrice;
        var exchFee = totalBTC * .001;
        var actualBTC = totalBTC - exchFee;
        var transferredBTC = actualBTC - .000014;
        var divestment = transferredBTC * response.btcPrice;
        var actualDivestment = divestment - (divestment * .04);
        var exitPrice = actualDivestment / response.numCoinsSold;
        var output = "* New exit *\nCryptocurrency: " + response.altName + "\nAmount of coins / tokens sold: " + response.numCoinsSold +
            " " + response.altName + "\nSold " + response.altName + " at: " + response.altPrice + " BTC\nSold Bitcoin at: $" +
            response.btcPrice + " per BTC\nTotal Bitcoin sold: " + transferredBTC + " BTC\nFinal divestment: $" + actualDivestment +
            " (factoring in Binance fee, transfer fee and Coinbase fee)\nExit price: $" + exitPrice +
            " (factoring in Binance fee, transfer fee and Coinbase fee)\nDate (trade log): " +
            moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./exits.txt', output + "\n", function (error) {
            if (error) throw error;
        });
    });
};

// "getROIPercentUSD()" function
// This function runs when the user wants to find their ROI (return of investment). By using inquirer, the user is prompted for the name 
// of the altcoin they traded, their initial investment (in $USD), and their final divestment (in $USD). The user can input data logged 
// in their entries / exits .txt files or enter arbitrary values for testing trades.
function getROIPercentUSD() {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin traded: "
        },
        {
            type: "input",
            name: "investment",
            message: "Enter initial investment: "
        },
        {
            type: "input",
            name: "divestment",
            message: "Enter final divesment: "
        }
    ]).then(function (response) {
        var netChange = response.divestment - response.investment;
        var roiDecimalUSD = (response.divestment / response.investment);
        var roiPercentUSD = (roiDecimalUSD - 1) * 100;
        var output = "";
        if (netChange >= 0) {
            output = "* New ROI calculation *\nCryptocurrency: " + response.altName + "\nInitial investment: $" + response.investment +
                "\nFinal divestment: $" + response.divestment + "\nReturn of investment (decimal): " + roiDecimalUSD +
                "x ROI\nReturn of investment (percent): " + roiPercentUSD + "% ROI\nTotal $USD profit: $" + netChange + "\n";
        } else {
            netChange = netChange * -1;
            output = "* New ROI calculation *\nCryptocurrency: " + response.altName + "\nInitial investment: $" + response.investment +
                "\nFinal divestment: $" + response.divestment + "\nReturn of investment (decimal): " + roiDecimalUSD +
                "x ROI\nReturn of investment (percent): " + roiPercentUSD + "% ROI\nTotal $USD loss: -$" + netChange + 
                "\nDate (trade log): " + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        }
        console.log(output);
        fs.appendFile('./roi.txt', output + "\n", function (error) {
            if (error) throw error;
        });
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
        choices: ["Make new entry trade", "Make new exit trade", "Calculate ROI % (in $USD)"]
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
        case "Calculate ROI % (in $USD)":
            getROIPercentUSD();
            break;
    };
});
