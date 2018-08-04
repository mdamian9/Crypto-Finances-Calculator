// Require npm inquirer, npm moment and npm fs packages
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");

// "beginApp()" function
// This function holds the main prompt: which asks the user for command to start app.
function beginApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: ["Make new entry trade", "Make new exit trade", "Calculate average entry price",
                "Full ROI calculation (return of investment)", "Get target price ($)", "Get percent change (%)"]
        }
    ]).then(function (response) {
        var userCommand = response.command;
        switch (userCommand) {
            case "Make new entry trade":
                newEntryPrompt();
                break;
            case "Make new exit trade":
                newExitPrompt();
                break;
            case "Calculate average entry price":
                calcAvgEntryPrompt();
                break;
            case "Full ROI calculation (return of investment)":
                calculateROI();
                break;
            case "Get target price ($)":
                targetPricePrompt();
                break;
            case "Get percent change (%)":
                percentChangePrompt();
                break;
        };
    });
};

// "newEntryPrompt()" function
// This function is called when the user chooses to make a new entry trade in the first prompt. It asks the user to choose what type of entry 
// trade they would like to make ($USD, $USDT (Tether), or BTC), and calls the appropriate function based on the user's response.
function newEntryPrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "Choose trade:",
            choices: ["New entry trade ($USD)", "New entry trade ($USDT)", "New entry trade (BTC)"]
        }
    ]).then(function (response) {
        var userCommand = response.command;
        switch (userCommand) {
            case "New entry trade ($USD)":
                newEntryTradeUSD();
                break;
            case "New entry trade ($USDT)":
                newEntryTradeUSDT();
                break;
            case "New entry trade (BTC)":
                newEntryTradeBTC();
                break;
        };
    });
};

// "newExitPrompt()" function
// This function is called when the user chooses to make a new exit trade in the first prompt. It asks the user to choose what type of exit 
// trade they would like to make ($USD, $USDT (Tether), or BTC), and calls the appropriate function based on the user's response.
function newExitPrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "Choose trade:",
            choices: ["New exit trade ($USD)", "New exit trade ($USDT)", "New exit trade (BTC)"]
        }
    ]).then(function (response) {
        var userCommand = response.command;
        switch (userCommand) {
            case "New exit trade ($USD)":
                newExitTradeUSD();
                break;
            case "New exit trade ($USDT)":
                newExitTradeUSDT();
                break;
            case "New exit trade (BTC)":
                newExitTradeBTC();
                break;
        };
    });
};

// "calcAvgEntryPrompt()"
// This function is called when the user chooses to make an average entry price calculation in the first prompt. It asks the user to 
// choose what type of average entry price calculation they would like to make ($USD or BTC), and calls the appropriate function based on 
// the user's response.
function calcAvgEntryPrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "Choose type of average entry calculation:",
            choices: ["Average entry price ($USD)", "Average entry price (BTC)"]

        }
    ]).then(function (response) {
        var userCommand = response.command;
        switch (userCommand) {
            case "Average entry price ($USD)":
                calcAvgEntryPrice();
                break;
            case "Average entry price (BTC)":
                calcAvgEntryPriceBTC();
                break;
        };
    });
};

// "targetPricePrompt()" function
// This function is called when the user chooses to get target price in the first prompt. It asks the user to choose what type of target 
// price calculation they would like to make ($USD or BTC), and calls the appropriate function based on the user's response.
function targetPricePrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "Choose target:",
            choices: ["Get target price ($USD)", "Get target price (BTC)"]
        }
    ]).then(function (response) {
        var userCommand = response.command;
        switch (userCommand) {
            case "Get target price ($USD)":
                getTargetPriceUSD();
                break;
            case "Get target price (BTC)":
                getTargetPriceBTC();
                break;
        };
    });
};

// "percentChangePrompt()" function
// This function is called when the user chooses to get percent change in the first prompt. It asks the user to choose what type of 
// percent change calculation they would like to make ($USD or BTC), and calls the appropriate function based on the user's response.
function percentChangePrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "Choose currency:",
            choices: ["Get percent change ($USD)", "Get percent change (BTC)"]
        }
    ]).then(function (response) {
        var userCommand = response.command;
        switch (userCommand) {
            case "Get percent change ($USD)":
                getPercentChangeUSD();
                break;
            case "Get percent change (BTC)":
                getPercentChangeBTC();
                break;
        };
    });
};

// "askIfDone()" function
// This function asks the user if they are done using the app.
function askIfDone() {
    inquirer.prompt([
        {
            type: "list",
            name: "doneWithApp",
            message: "Are you finished with the app?",
            choices: ["Yes", "No"]
        }
    ]).then(function (response) {
        if (response.doneWithApp === "Yes") {
            console.log("Good luck trading.");
        } else {
            beginApp();
        };
    });
};

// "newEntryTradeUSD()" function
// This function runs when the user wants to create a new entry (buy) trade. By using inquirer, the user is prompted for their initial 
// investment, the price of Bitcoin when they bought, the name of the altcoin they bought, and the price of the altcoin they bought 
// (altcoin price is in BTC). This function assumes the user is buying BTC on Coinbase with a 4% purchase fee, a 0.000014 BTC transfer fee 
// to altcoin exchange, and a 0.1% purchase fee on Binance when buying an altcoin.
function newEntryTradeUSD() {
    inquirer.prompt([
        {
            type: "input",
            name: "investment",
            message: "Enter total investment ($USD): "
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
        var output = "* New entry trade ($USD) *\nCryptocurrency: " + response.altName + "\nInitial investment: $" + response.investment +
            "\nBought Bitcoin at: $" + response.btcPrice + " per BTC\nTotal BTC available (after all fees): " + transferredBTC.toFixed(8)
            + " BTC\nBought " + response.altName + " at: " + response.altPrice + " BTC\nTotal coins bought: " + actualCoins + " " +
            response.altName + "\nEntry price ($USD): $" + entryPriceUSD.toFixed(6) +
            " (factoring in Coinbase fee, transfer fee and Binance fee)\nEntry price (BTC): " + entryPriceBTC.toFixed(8) +
            " BTC (factoring in Coinbase fee, transfer fee and Binance fee)\nDate logged: " +
            moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./entries_USD.txt', output + "\n", function (error) {
            if (error) throw error;
        });
        askIfDone();
    });
};

// "newEntryTradeUSDT()" function
// This function runs when the user wants to create a new entry (buy) trade using $USDT (Tether). By using inquirer, the user is prompted 
// for their initial investment, the price of Bitcoin when they bought, the name of the altcoin they bought, and the price of the altcoin 
// they bought (altcoin price is in BTC). This function assumes the user is buying BTC / buying altcoin on Binance with a 0.1% purchase 
// fee on the BTC buy and altcoin buy each.
function newEntryTradeUSDT() {
    inquirer.prompt([
        {
            type: "input",
            name: "investment",
            message: "Enter total investment ($USDT): "
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
        var actualBTC = totalBTC - (totalBTC * .001);
        var totalCoins = actualBTC / parseFloat(response.altPrice);
        var exchFee = totalCoins * .001;
        var actualCoins = totalCoins - exchFee;
        var entryPriceUSDT = parseFloat(response.investment) / actualCoins;
        var entryPriceBTC = actualBTC / actualCoins;
        var output = "* New entry trade ($USDT) *\nCryptocurrency: " + response.altName + "\nInitial investment: $" + response.investment +
            " (Tether)\nBought Bitcoin at: $" + response.btcPrice + " per BTC\nTotal BTC available (after all fees): " +
            actualBTC.toFixed(8) + " BTC\nBought " + response.altName + " at: " + response.altPrice + " BTC\nTotal coins bought: " +
            actualCoins + " " + response.altName + "\nEntry price ($USDT): $" + entryPriceUSDT.toFixed(6) +
            " (factoring in Binance fees)\nEntry price (BTC): " + entryPriceBTC.toFixed(8) +
            " BTC (factoring in Binance fee)\nDate logged: " + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./entries_USDT.txt', output + "\n", function (error) {
            if (error) throw error;
        });
        askIfDone();
    });
};

// "newEntryTradeBTC()" function
// This function runs when the user wants to create a new entry (buy) trade strictly in BTC. By using inquirer, the user is prompted for 
// their initial investment in BTC, the name of the altcoin they bought, and the price of the altcoin they bought (altcoin price is in BTC). 
// This function assumes the user is trading the altcoin on Binance with a 0.1% trade fee when buying altcoins.
function newEntryTradeBTC() {
    inquirer.prompt([
        {
            type: "input",
            name: "investmentBTC",
            message: "Enter total investment (BTC): "
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
        var totalCoins = parseFloat(response.investmentBTC) / parseFloat(response.altPrice);
        var exchFee = totalCoins * .001;
        var actualCoins = totalCoins - (exchFee)
        var entryPriceBTC = actualCoins / parseFloat(response.investmentBTC);
        var output = "* New entry trade (BTC) *\nCryptocurrency: " + response.altName + "\nInitial investment: " + response.investmentBTC +
            " BTC\nBought " + response.altName + " at: " + response.altPrice + " BTC\nTotal coins bought: " + actualCoins + " " +
            response.altName + "\nEntry price (BTC): " + entryPriceBTC.toFixed(8) + " BTC (factoring in Binance fee)\nDate logged: " +
            moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./entries_BTC.txt', output + "\n", function (error) {
            if (error) throw error;
        });
        askIfDone();
    });
};

// "newExitTradeUSD()" function
// This function runs when the user wants to create a new exit (sell) trade. By using inquirer, the user is prompted for the name of the 
// altcoin they sold, the amount of conis / tokens they sold, the price they sold the altcoin at (altcoin price is in BTC), then the price
// they sold Bitcoin at in the end. This function assumes the user is selling altcoin / selling BTC on Binance with a 0.1% purchase on the 
// altcoin sell and BTC sell each.
function newExitTradeUSD() {
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
        var totalBTC = parseFloat(response.numCoinsSold) * parseFloat(response.altPrice);
        var exchFee = totalBTC * .001;
        var actualBTC = totalBTC - exchFee;
        var transferredBTC = actualBTC - .000014;
        var divestment = transferredBTC * parseFloat(response.btcPrice);
        var actualDivestment = divestment - (divestment * .04);
        var exitPrice = actualDivestment / parseFloat(response.numCoinsSold);
        var output = "* New exit trade ($USD) *\nCryptocurrency: " + response.altName + "\nAmount of coins / tokens sold: " +
            response.numCoinsSold + " " + response.altName + "\nSold " + response.altName + " at: " + response.altPrice +
            " BTC\nSold Bitcoin at: $" + response.btcPrice + " per BTC\nTotal Bitcoin sold: " + transferredBTC.toFixed(8) +
            " BTC\nFinal divestment: $" + actualDivestment + " (factoring in Binance fee, transfer fee and Coinbase fee)\nExit price: $" +
            exitPrice.toFixed(6) + " (factoring in Binance fee, transfer fee and Coinbase fee)\nDate logged: " +
            moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./exits_USD.txt', output + "\n", function (error) {
            if (error) throw error;
        });
        askIfDone();
    });
};

// "newExitTradeUSDT()" function
// This function runs when the user wants to create a new exit (sell) trade back to $USDT (Tether). By using inquirer, the user is prompted 
// for the name of the altcoin they sold, the amount of conis / tokens they sold, the price they sold the altcoin at (altcoin price is in 
// BTC), then the price they sold Bitcoin at in the end. This function assumes the user is selling altcoin on Binance with a 0.1% trade 
// fee, charged a 0.000014 BTC transfer fee to Coinbase, and a 4% trade fee at Coinbase when selling Bitcoin.
function newExitTradeUSDT() {
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
        var totalBTC = parseFloat(response.numCoinsSold) * parseFloat(response.altPrice);
        var exchFee = totalBTC * .001;
        var actualBTC = totalBTC - exchFee;
        var totalUSDT = actualBTC * parseFloat(response.btcPrice);
        var exchFee2 = totalUSDT * .001;
        var actualUSDT = totalUSDT - exchFee2;
        var exitPriceUSDT = actualUSDT / parseFloat(response.numCoinsSold);
        var output = "* New exit trade ($USDT) *\nCryptocurrency: " + response.altName + "\nAmount of coins / tokens sold: " +
            response.numCoinsSold + " " + response.altName + "\nSold " + response.altName + " at: " + response.altPrice +
            " BTC\nSold Bitcoin at: $" + response.btcPrice + " per BTC\nTotal Bitcoin sold: " + actualBTC.toFixed(8) +
            " BTC\nTotal $USDT: $" + actualUSDT.toFixed(6) + " (factoring in Binance fees)\nExit price: $" +
            exitPriceUSDT.toFixed(6) + " (factoring in Binance fees)\nDate logged: " + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./exits_USDT.txt', output + "\n", function (error) {
            if (error) throw error;
        });
        askIfDone();
    });
};

// "newExitTradeBTC()" function
// This function runs when the user wants to create a new exit (sell) trade strictly in BTC. By using inquirer, the user is prompted for 
// the name of the altcoin they bought, the number of coins / tokens sold, and the price they sold the altcoin at (price is in BTC). This 
// function assumes the user is trading the altcoin on Binance with a 0.1% trade fee when selling altcoins.
function newExitTradeBTC() {
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
        }
    ]).then(function (response) {
        var totalBTC = parseFloat(response.numCoinsSold) * parseFloat(response.altPrice);
        var exchFee = totalBTC * .001;
        var actualBTC = totalBTC - exchFee;
        var exitPriceBTC = actualBTC / parseFloat(response.numCoinsSold);
        var output = "* New exit trade (BTC) *\nCryptocurrency: " + response.altName + "\nAmount of coins / tokens sold: " +
            response.numCoinsSold + " " + response.altName + "\nSold " + response.altName + " at: " + response.altPrice +
            " BTC\nTotal BTC: " + actualBTC.toFixed(8) + " BTC (factoring in Binance fee)\nExit price: " + exitPriceBTC.toFixed(8) +
            " BTC (factoring in Binance fee)\nDate logged: " + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n";
        console.log(output);
        fs.appendFile('./exits_BTC.txt', output + "\n", function (error) {
            if (error) throw error;
        });
        askIfDone();
    });
};

// "calcAvgEntryPrice()" function
// This function runs whenever the user wants to find the average entry price of multiple entries on a cryptocurrency. It asks the user 
// for their entry prices in $USD separated by a comma, entry prices in BTC separated by a comma, and the amount of altcoins / tokens 
// obtained on each investment separated by a comma. It then performs a weighted average calculation to find the weighted average entry 
// prices in both $USD and BTC. The user must input data logged in their entries_USD.txt and entries_BTC.txt files to make an average 
// $USD / BTC entry price calculation.
function calcAvgEntryPrice() {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin: "
        },
        {
            type: "input",
            name: "entryPricesUSD",
            message: "Enter all entry prices in $USD one by one, separated by a comma: "
        },
        {
            type: "input",
            name: "entryPricesBTC",
            message: "Enter all entry prices in BTC one by one, separated by a comma: "
        },
        {
            type: "input",
            name: "numCoinsPerInvestment",
            message: "Enter the amount of altcoins / tokens obtained on each investment one at a time, separated by a comma: "
        }
    ]).then(function (response) {
        var entryPricesUSDArr = response.entryPricesUSD.split(", ");
        var entryPricesBTCArr = response.entryPricesBTC.split(", ");
        var numCoinsArr = response.numCoinsPerInvestment.split(", ");
        if (entryPricesUSDArr.length !== entryPricesBTCArr.length !== numCoinsArr.length) {
            console.log("\nERROR: There was an error in your input");
        } else {
            var numOfInvestments = entryPricesUSDArr.length;
            var convertedPricesUSDArr = [];
            var convertedPricesBTCArr = [];
            var convertedNumCoinsArr = [];
            var sumTotalCoins = 0;
            var weightedAvgNumeratorUSD = 0;
            var weightedAvgNumeratorBTC = 0;
            var entryPricesStrUSD = "";
            var entryPricesStrBTC = "";
            for (var i = 0; i < numOfInvestments; i++) {
                convertedPricesUSDArr.push(parseFloat(entryPricesUSDArr[i]));
                convertedPricesBTCArr.push(parseFloat(entryPricesBTCArr[i]));
                convertedNumCoinsArr.push(parseFloat(numCoinsArr[i]));
                weightedAvgNumeratorUSD = weightedAvgNumeratorUSD + (convertedPricesUSDArr[i] * convertedNumCoinsArr[i]);
                weightedAvgNumeratorBTC = weightedAvgNumeratorBTC + (convertedPricesBTCArr[i] * convertedNumCoinsArr[i]);
                sumTotalCoins = sumTotalCoins + convertedNumCoinsArr[i];
                entryPricesStrUSD = entryPricesStrUSD + " $" + entryPricesUSDArr[i] + ",";
                entryPricesStrBTC = entryPricesStrBTC + " " + entryPricesBTCArr[i] + " BTC,";
            };
            var avgEntryPriceUSD = weightedAvgNumeratorUSD / sumTotalCoins;
            var avgEntryPriceBTC = weightedAvgNumeratorBTC / sumTotalCoins;
            var output = "* New average entry calculation *\nCryptocurrency: " + response.altName + "\nEntries ($USD): " +
                entryPricesStrUSD.trim().slice(0, -1) + "\nEntries (BTC): " + entryPricesStrBTC.trim().slice(0, -1) +
                "\nSum of total investments ($USD): $" + weightedAvgNumeratorUSD.toFixed(0) + "\nSum of total investments (BTC): " +
                weightedAvgNumeratorBTC.toFixed(8) + " BTC\nSum of total coins / tokens obtained: " + sumTotalCoins + " " + response.altName +
                "\nAverage entry price ($USD): $" + avgEntryPriceUSD.toFixed(6) + "\nAverage entry price (BTC): " + " (after all fees)\n" +
                avgEntryPriceBTC.toFixed(8) + " BTC (after all fees)\n";
            console.log(output);
            fs.appendFile('./avg_entries_USD.txt', output + "\n", function (error) {
                if (error) throw error;
            });
            askIfDone();
        };
    });
};

// "calcAvgEntryPriceBTC()" function
// This function runs whenever the user wants to find the average entry price of multiple entries strictly made in BTC on a cryptocurrency. 
// It asks the user for their entry prices in BTC separated by a comma, and the amount of altcoins / tokens obtained on each investment 
// separated by a comma. It then performs a weighted average calculation to find the weighted average entry price in BTC. The user must 
// input data logged in their entries_BTC.txt file to make an average BTC entry price calculation.
function calcAvgEntryPriceBTC() {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin: "
        },
        {
            type: "input",
            name: "entryPricesBTC",
            message: "Enter all entry prices in BTC one by one, separated by a comma: "
        },
        {
            type: "input",
            name: "numCoinsPerInvestment",
            message: "Enter the amount of altcoins / tokens obtained on each investment one at a time, separated by a comma: "
        }
    ]).then(function (response) {
        var entryPricesBTCArr = response.entryPricesBTC.split(", ");
        var numCoinsArr = response.numCoinsPerInvestment.split(", ");
        // Error check: make sure num of entry prices is the same as num of times tokens were obtained (bought)
        if (entryPricesBTCArr.length !== numCoinsArr.length) {
            console.log("\nERROR: There was an error in your input");
        } else {
            var numOfInvestments = entryPricesBTCArr.length;
            var convertedPricesBTCArr = [];
            var convertedNumCoinsArr = [];
            var sumTotalCoins = 0;
            var weightedAvgNumeratorBTC = 0;
            var entryPricesStrBTC = "";
            for (var i = 0; i < numOfInvestments; i++) {
                convertedPricesBTCArr.push(parseFloat(entryPricesBTCArr[i]));
                convertedNumCoinsArr.push(parseFloat(numCoinsArr[i]));
                weightedAvgNumeratorBTC = weightedAvgNumeratorBTC + (convertedPricesBTCArr[i] * convertedNumCoinsArr[i]);
                sumTotalCoins = sumTotalCoins + convertedNumCoinsArr[i];
                entryPricesStrBTC = entryPricesStrBTC + " " + entryPricesBTCArr[i] + " BTC,";
            };
            var avgEntryPriceBTC = weightedAvgNumeratorBTC / sumTotalCoins;
            var output = "* New average entry calculation *\nCryptocurrency: " + response.altName + "\nEntries (BTC): " +
                entryPricesStrBTC.trim().slice(0, -1) + "\nSum of total investments (BTC): " + weightedAvgNumeratorBTC.toFixed(8) +
                " BTC\nSum of total coins / tokens obtained: " + sumTotalCoins + " " + response.altName + "\nAverage entry price (BTC): " +
                avgEntryPriceBTC.toFixed(8) + " BTC (after all fees)\n";
            console.log(output);
            fs.appendFile('./avg_entries_BTC.txt', output + "\n", function (error) {
                if (error) throw error;
            });
        };
    });
};

// "calculateROI()" function
// This function runs when the user wants to find their ROI (return of investment). By using inquirer, the user is prompted for the name 
// of the altcoin they traded, their initial investment (in $USD and BTC), and their final divestment (in $USD and BTC). The user must 
// input data logged in their entries / exits .txt files to make a complete ROI calculation.
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
        var netChangeUSD = parseFloat(response.divestmentUSD) - parseFloat(response.investmentUSD);
        var roiDecimalUSD = parseFloat(response.divestmentUSD) / parseFloat(response.investmentUSD);
        var roiPercentUSD = (roiDecimalUSD - 1) * 100;
        var netChangeBTC = parseFloat(response.divestmentBTC) - parseFloat(response.investmentBTC);
        var roiDecimalBTC = parseFloat(response.divestmentBTC) / parseFloat(response.investmentBTC);
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
        };
        console.log(output);
        fs.appendFile('./roi.txt', output + "\n", function (error) {
            if (error) throw error;
        });
        askIfDone();
    });
};

// "getTargetPriceUSD()" function
// This function runs whenever the user wants to make a quick calculation to find the price they need to sell at, for a certain percentage 
// gain. The user is asked to enter an entry price in $USD and the percentage gain they are looking for to find the target sell price.
function getTargetPriceUSD() {
    inquirer.prompt([
        {
            type: "input",
            name: "entryPriceUSD",
            message: "Enter entry price (in $USD): "
        },
        {
            type: "input",
            name: "targetPercentChange",
            message: "Enter percent gain you're looking for: "
        }
    ]).then(function (response) {
        var entryPriceUSD = parseFloat(response.entryPriceUSD);
        var targetPercentChange = parseFloat(response.targetPercentChange);
        var convertedPercentChange = targetPercentChange * .01;
        var targetPriceUSD = entryPriceUSD + (entryPriceUSD * convertedPercentChange);
        console.log("Entry price: $" + response.entryPriceUSD + "\nPercent gain looking for: " + response.targetPercentChange +
            "%\nTarget sell price: $" + targetPriceUSD.toFixed(6) + "\n");
        askIfDone();
    });
};

// "getTargetPriceBTC()" function
// This function runs whenever the user wants to make a quick calculation to find the price they need to sell at, for a certain percentage 
// gain. The user is asked to enter an entry price in BTC and the percentage gain they are looking for to find the target sell price.
function getTargetPriceBTC() {
    inquirer.prompt([
        {
            type: "input",
            name: "entryPriceBTC",
            message: "Enter entry price (in BTC): "
        },
        {
            type: "input",
            name: "targetPercentChange",
            message: "Enter percent gain you're looking for: "
        }
    ]).then(function (response) {
        var entryPriceBTC = parseFloat(response.entryPriceBTC);
        var targetPercentChange = parseFloat(response.targetPercentChange);
        var convertedPercentChange = targetPercentChange * .01;
        var targetPriceBTC = entryPriceBTC + (entryPriceBTC * convertedPercentChange);
        console.log("Entry price: " + response.entryPriceBTC + " BTC\nPercent gain looking for: " + response.targetPercentChange +
            "%\nTarget sell price: " + targetPriceBTC.toFixed(8) + " BTC\n");
        askIfDone();
    });
};

// "getPercentChangeUSD()" function
// This function runs whenever the user wants to make a quick calculation for percentage change on a trade. The user is asked to enter an 
// entry price and an exit price in $USD to obtain the change in percentage.
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
        var decimalChangeUSD = parseFloat(response.exitPriceUSD) / parseFloat(response.entryPriceUSD);
        var percentChangeUSD = (decimalChangeUSD - 1) * 100;
        console.log("Entry price: $" + response.entryPriceUSD + "\nExit price: $" + response.exitPriceUSD + "\nDecimal change: " +
            decimalChangeUSD.toFixed(2) + "x\nPercent change: " + percentChangeUSD.toFixed(2) + "%");
        askIfDone();
    });
};

// "getPercentChangeBTC()" function
// This function runs whenever the user wants to make a quick calculation for percentage change on a trade. The user is asked to enter an 
// entry price and an exit price in BTC to obtain the change in percentage.
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
        var decimalChangeBTC = parseFloat(response.exitPriceBTC) / parseFloat(response.entryPriceBTC);
        var percentChangeBTC = (decimalChangeBTC - 1) * 100;
        console.log("Entry price: " + response.entryPriceBTC + " BTC\nExit price: " + response.exitPriceBTC + " BTC\nDecimal change: " +
            decimalChangeBTC.toFixed(2) + "x\nPercent change: " + percentChangeBTC.toFixed(2) + "%");
        askIfDone();
    });
};

// Call "beginApp()" to begin app
beginApp();

// To do:
// 1. Create database to make calculating avg entry prices easier?
