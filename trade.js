// Require npm inquirer, npm moment and npm fs packages
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");

// "askIfDone()" function
// This function asks the user if they are done using the app
function askIfDone() {

};

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
        var entryPriceUSD = parseFloat(response.investment) / actualCoins;
        var entryPriceBTC = transferredBTC / actualCoins;
        var output = "* New entry trade *\nCryptocurrency: " + response.altName + "\nInitial investment: $" + response.investment +
            "\nBought Bitcoin at: $" + response.btcPrice + " per BTC\nTotal BTC available (after all fees): " + transferredBTC.toFixed(8)
            + " BTC\nBought " + response.altName + " at: " + response.altPrice + " BTC\nTotal coins bought: " + actualCoins + " " +
            response.altName + "\nEntry price (BTC): $" + entryPriceBTC.toFixed(8) + 
            " (factoring in Coinbase fee, transfer fee and Binance fee)\nEntry price ($USD): " + entryPriceUSD.toFixed(6) + 
            " BTC (factoring in Coinbase fee, transfer fee and Binance fee)\nDate logged: " + 
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
        var output = "* New exit trade *\nCryptocurrency: " + response.altName + "\nAmount of coins / tokens sold: " +
            response.numCoinsSold + " " + response.altName + "\nSold " + response.altName + " at: " + response.altPrice +
            " BTC\nSold Bitcoin at: $" + response.btcPrice + " per BTC\nTotal Bitcoin sold: " + transferredBTC +
            " BTC\nFinal divestment: $" + actualDivestment + " (factoring in Binance fee, transfer fee and Coinbase fee)\nExit price: $" +
            exitPrice + " (factoring in Binance fee, transfer fee and Coinbase fee)\nDate logged: " +
            moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./exits.txt', output + "\n", function (error) {
            if (error) throw error;
        });
    });
};

// "calculateROI()" function
// This function runs when the user wants to find their ROI (return of investment). By using inquirer, the user is prompted for the name 
// of the altcoin they traded, their initial investment (in $USD and BTC), and their final divestment (in $USD and BTC). The user must input 
// data logged in their entries / exits .txt files to make a complete ROI calculation.
function calculateROI() {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin traded: "
        },
        {
            type: "input",
            name: "investmentUSD",
            message: "Enter initial investment (in $USD): "
        },
        {
            type: "input",
            name: "investmentBTC",
            message: "Enter initial investment (in BTC): "
        },
        {
            type: "input",
            name: "divestmentUSD",
            message: "Enter final divesment (in $USD): "
        },
        {
            type: "input",
            name: "divestmentBTC",
            message: "Enter final divesment (in BTC): "
        }
    ]).then(function (response) {
        var netChangeUSD = response.divestmentUSD - response.investmentUSD;
        var roiDecimalUSD = response.divestmentUSD / response.investmentUSD;
        var roiPercentUSD = (roiDecimalUSD - 1) * 100;
        var netChangeBTC = response.divestmentBTC - response.investmentBTC;
        var roiDecimalBTC = response.divestmentBTC / response.investmentBTC;
        var roiPercentBTC = (roiDecimalBTC - 1) * 100;
        var output = "";
        if (netChangeUSD >= 0 && netChangeBTC >= 0) {
            output = "* New ROI calculation *\nCryptocurrency: " + response.altName + "\nInitial investment (USD): $" +
                response.investmentUSD + "\nInitial investment (BTC): " + response.investmentBTC + " BTC\nFinal divestment (USD): $" +
                response.divestmentUSD + "\nFinal divestment (BTC): " + response.divestmentBTC +
                " BTC\nReturn of investment in $USD (decimal): " + roiDecimalUSD + "x ROI\nReturn of investment in $USD (percent): " +
                roiPercentUSD + "% ROI\nReturn of investment in BTC (decimal): " + roiDecimalBTC +
                "x ROI\nReturn of investment in BTC (percent): " + roiPercentBTC + "% ROI\nTotal $USD profit: $" + netChangeUSD +
                "\nTotal BTC profit: " + netChangeBTC + " BTC\nDate logged: " + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        } else {
            netChangeUSD = netChangeUSD * -1;
            netChangeBTC = netChangeBTC * -1;
            output = "* New ROI calculation *\nCryptocurrency: " + response.altName + "\nInitial investment: $" + response.investment +
                "\nFinal divestment: $" + response.divestment + "\nReturn of investment in $USD (decimal): " + roiDecimalUSD +
                "x ROI\nReturn of investment in $USD (percent): " + roiPercentUSD + "% ROI\nReturn of investment in BTC (decimal): " +
                roiDecimalBTC + "x ROI\nReturn of investment in BTC (percent): " + roiPercentBTC + "% ROI\nTotal $USD loss: $" +
                netChangeUSD + "\nTotal BTC loss: " + netChangeBTC + " BTC\nDate logged: " + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        }
        console.log(output);
        fs.appendFile('./roi.txt', output + "\n", function (error) {
            if (error) throw error;
        });
    });
};

// "getavgEntryPriceUSDUSD()" function
// This function runs whenever the user wants to find the average entry price of multiple entries on a cryptocurrency. It asks the user 
// for their entry prices, separated by a comma, and the amount of altcoins / tokens obtained on each investment separated by a comma. It 
// then performs a weighted average calculation to find the weighted average.
function getavgEntryPriceUSDUSD() {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin: "
        },
        {
            type: "input",
            name: "entryPrices",
            message: "Enter all entry prices in $USD one by one, separated by a comma: "
        },
        {
            type: "input",
            name: "numCoinsPerInvestment",
            message: "Enter the amount of altcoins / tokens obtained on each investment one at a time, separated by a comma: "
        }
    ]).then(function (response) {
        var entryPricesArr = response.entryPrices.split(", ");
        var numCoinsArr = response.numCoinsPerInvestment.split(", ");
        var numOfInvestments = entryPricesArr.length;
        var convertedPricesArr = [];
        var convertedNumCoinsArr = [];
        var sumTotalCoins = 0;
        var weightedAvgNumerator = 0;
        var avgEntryPriceUSD = 0;
        for (var i = 0; i < numOfInvestments; i++) {
            convertedPricesArr.push(parseFloat(entryPricesArr[i]));
            convertedNumCoinsArr.push(parseFloat(numCoinsArr[i]));
            weightedAvgNumerator = weightedAvgNumerator + (convertedPricesArr[i] * convertedNumCoinsArr[i]);
            sumTotalCoins = sumTotalCoins + convertedNumCoinsArr[i];
        };
        avgEntryPriceUSD = weightedAvgNumerator / sumTotalCoins;
        console.log("Sum of total investment: $" + weightedAvgNumerator + "\nSum of total coins / tokens obtained: " + sumTotalCoins +
            " " + response.altName + "\nAverage entry price: $" + avgEntryPriceUSD + "\n");
    });
};

// "calculateAvgEntryPrice()" function
// This function runs whenever the user wants to find the average entry price of multiple entries on a cryptocurrency. It asks the user 
// for their investments, separated by a comma, and the amount of altcoins / tokens obtained on each investment separated by a comma. It 
// then uses the sum of the total amount of investment divided by the sum of total amount of tokens obtained on all investments to find 
// the average entry price.
function calculateAvgEntryPrice() {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin: "
        },
        {
            type: "input",
            name: "investmentsMadeUSD",
            message: "Enter all investments made in $USD one by one, separated by a comma: "
        },
        {
            type: "input",
            name: "investmentsMadeBTC",
            message: "Enter all investments made in BTC one by one, separated by a comma: "
        },
        {
            type: "input",
            name: "numCoinsPerInvestment",
            message: "Enter the amount of altcoins / tokens obtained on each investment one at a time, separated by a comma: "
        }
    ]).then(function (response) {
        var investmentsUSDArr = response.investmentsMadeUSD.split(", ");
        var investmentsBTCArr = response.investmentsMadeBTC.split(", ");
        var numCoinsArr = response.numCoinsPerInvestment.split(", ");
        var numOfInvestments = investmentsUSDArr.length;
        var convertedInvestmentsUSDArr = [];
        var convertedInvestmentsBTCArr = [];
        var convertedNumCoinsArr = [];
        var investmentsStrUSD = "";
        var investmentsStrBTC = "";
        var sumTotalInvestmentsUSD = 0;
        var sumTotalInvestmentsBTC = 0;
        var sumTotalCoins = 0;
        var avgEntryPriceUSD = 0;
        var avgEntryPriceBTC = 0;
        for (var i = 0; i < numOfInvestments; i++) {
            convertedInvestmentsUSDArr.push(parseFloat(investmentsUSDArr[i]));
            convertedInvestmentsBTCArr.push(parseFloat(investmentsBTCArr[i]));
            convertedNumCoinsArr.push(parseFloat(numCoinsArr[i]));
            sumTotalInvestmentsUSD = sumTotalInvestmentsUSD + convertedInvestmentsUSDArr[i];
            sumTotalInvestmentsBTC = sumTotalInvestmentsBTC + convertedInvestmentsBTCArr[i];
            sumTotalCoins = sumTotalCoins + convertedNumCoinsArr[i];
            investmentsStrUSD = investmentsStrUSD + " $" + investmentsUSDArr[i] + ",";
            investmentsStrBTC = investmentsStrBTC + " " + investmentsBTCArr[i] + " BTC,";
        };
        avgEntryPriceUSD = sumTotalInvestmentsUSD / sumTotalCoins;
        avgEntryPriceBTC = sumTotalInvestmentsBTC / sumTotalCoins;
        var output = "* New average entry calculation *\nCryptocurrency: " + response.altName + "\nInvestments made ($USD): " +
            investmentsStrUSD.trim().slice(0, -1) + "\nInvestments made (BTC): " + investmentsStrBTC.trim().slice(0, -1) +
            "\nSum of total investments ($USD): $" + sumTotalInvestmentsUSD + "\nSum of total investments (BTC): " + sumTotalInvestmentsBTC +
            " BTC\nSum of total coins / tokens obtained: " + sumTotalCoins + " " + response.altName + "\nAverage entry price ($USD): $" +
            avgEntryPriceUSD + "\nAverage entry price (BTC): " + avgEntryPriceBTC + " BTC\n";
        console.log(output);
        fs.appendFile('./avg_entries.txt', output + "\n", function (error) {
            if (error) throw error;
        });
    });
};

// "getTargetPriceUSD()"
function getTargetPriceUSD() {

};

// "getTargetPriceBTC()"
function getTargetPriceBTC() {

};

// "getPercentChangeUSD()" function
// This function runs whenever a user wants to make a quick calculation for percentage change on a trade. The use must give a theoretical  
// entry price and a theoretical exit price in $USD to obtain the change in percentage.
function getPercentChangeUSD() {
    inquirer.prompt([
        {
            type: "input",
            name: "entryPriceUSD",
            message: "Enter entry price (in $USD):"
        },
        {
            type: "input",
            name: "exitPriceUSD",
            message: "Enter exit price (in $USD):"
        }
    ]).then(function (response) {
        var decimalChangeUSD = response.exitPriceUSD / response.entryPriceUSD;
        var percentChangeUSD = (decimalChangeUSD - 1) * 100;
        console.log("Decimal change: " + decimalChangeUSD + "x\nPercent change: " + percentChangeUSD + "%");
    });
};


// "getPercentChangeBTC()" function
// This function runs whenever a user wants to make a quick calculation for percentage change on a trade. The use must give a theoretical  
// entry price and a theoretical exit price in BTC to obtain the change in percentage.
function getPercentChangeBTC() {
    inquirer.prompt([
        {
            type: "input",
            name: "entryPriceBTC",
            message: "Enter entry price (in BTC):"
        },
        {
            type: "input",
            name: "exitPriceBTC",
            message: "Enter exit price (in BTC):"
        }
    ]).then(function (response) {
        var decimalChangeBTC = response.exitPriceBTC / response.entryPriceBTC;
        var percentChangeBTC = (decimalChangeBTC - 1) * 100;
        console.log("Decimal change: " + decimalChangeBTC + "x\nPercent change: " + percentChangeBTC + "%");
    });
};

// Main prompt: ask user for command to start proceed
inquirer.prompt([
    {
        type: "list",
        name: "command",
        message: "What would you like to do?",
        choices: ["Make new entry trade", "Make new exit trade", "Calculate average entry price",
            "Full ROI calculation (return of investment)", "Get target price ($USD)", "Get target price (BTC)",
            "Get percent change ($USD)", "Get percent change (BTC)"]
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
        case "Calculate average entry price":
            calculateAvgEntryPrice();
            break;
        case "Full ROI calculation (return of investment)":
            calculateROI();
            break;
        case "Get target price ($USD)":
            getTargetPriceUSD();
            break;
        case "Get target price (BTC)":
            getTargetPriceBTC();
            break;
        case "Get percent change ($USD)":
            getPercentChangeUSD();
            break;
        case "Get percent change (BTC)":
            getPercentChangeBTC();
            break;
    };
});

