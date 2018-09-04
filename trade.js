// Require npm inquirer, moment and fs packages
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");

// "beginApp()" function
// This function holds the main prompt: which asks the user for command to start app.
beginApp = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "Choose from the following:",
            choices: ["Make new entry trade", "Make new exit trade", "Calculate average entry price",
                "Calculate ROI (return of investment)", "Get target price ($)", "Get percent change (%)"]
        }
    ]).then(response => {
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
            case "Calculate ROI (return of investment)": // needs fixing - refactor into one
                calcRoiPrompt();
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

// // "validatePrice()" function ------- still in question
// // This function...
// function validateNumber(number) {
//     var flag = true;
//     var values = /^[\d.]+$/;
//     console.log("\n" + values.test(number));
//     if (!values.test(number)) {
//         flag = "Please enter valid input.";
//     };
//     return flag;
// };

// // "validateName()" function
// // This function...
// function validateName(name) {
//     var flag = true;
//     var values = /^[\a-zA-z]+$/;
//     console.log("\n" + values.test(name));
//     if (!values.test(name)) {
//         flag = "Please enter valid input.";
//     };
//     return flag;
// };

// "newEntryPrompt()" function
// This function is called when the user chooses to make a new entry trade in the main prompt. It asks the user to choose what currency 
// they would like to make (USD, BTC, ETH, or BNB) and calls the newEntryTrade() function, passing in the user's response as a
// parameter.
newEntryPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "currency",
            message: "Choose currency to make new entry in:",
            choices: ["USD", "USDT", "BTC", "ETH", "BNB"]
        }
    ]).then(response => {
        newEntryTrade(response.currency);
    });
}

// "newExitPrompt()" function
// This function is called when the user chooses to make a new exit trade in the first prompt. It asks the user to choose what type of exit 
// trade they would like to make (USD, USDT (Tether), or BTC), and calls the appropriate function based on the user's response.
newExitPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "Choose trade:",
            choices: ["New exit trade (USD)", "New exit trade (USDT)", "New exit trade (BTC)"]
        }
    ]).then(response => {
        var userCommand = response.command;
        switch (userCommand) {
            case "New exit trade (USD)":
                newExitTradeUSD();
                break;
            case "New exit trade (USDT)":
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
// choose what type of average entry price calculation they would like to make (USD or BTC), and calls the appropriate function based on 
// the user's response.
calcAvgEntryPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "Choose type of average entry calculation:",
            choices: ["Average entry price (USD)", "Average entry price (BTC)"]

        }
    ]).then(response => {
        var userCommand = response.command;
        switch (userCommand) {
            case "Average entry price (USD)":
                calcAvgEntryPriceUSD();
                break;
            case "Average entry price (BTC)":
                calcAvgEntryPriceBTC();
                break;
        };
    });
};

// "calcRoiPrompt() function"
// This function is called when the user chooses to get target price in the first prompt. It asks the user to choose what currency they 
// would like to find their return of invesment in (USD, BTC, ETH, or BNB), and calls the calcRoi() function, passing in the currency that 
// was chosen by the user.
calcRoiPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "currency",
            message: "Choose currency:",
            choices: ["USD", "BTC", "ETH", "BNB"]
        }
    ]).then(response => {
        calcRoi(response.currency);
    });
};

// "targetPricePrompt()" function
// This function is called when the user chooses to get target price in the first prompt. It asks the user to choose what currency they 
// would like to find the target price in (USD, BTC, ETH, or BNB), and calls the getTargetPrice() function, passing in the currency that 
// was chosen by the user.
targetPricePrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "currency",
            message: "Choose currency: ",
            choices: ["USD", "BTC", "ETH", "BNB"]
        }
    ]).then(response => {
        getTargetPrice(response.currency);
    });
};

// "percentChangePrompt()" function
// This function is called when the user chooses to get percent change in the first prompt. It asks the user to choose what currency they  
// would like to make the percent change calculation in (USD, BTC, ETH, or BNB), and calls the getPercentChange() function, passing in the 
// currency that was chosen by the user.
percentChangePrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "currency",
            message: "Choose currency: ",
            choices: ["USD", "BTC", "ETH", "BNB"]
        }
    ]).then(response => {
        getPercentChange(response.currency);
    });
};


// "askIfDone()" function
// This function asks the user if they are done using the app.
askIfDone = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "doneWithApp",
            message: "Are you finished with the app?",
            choices: ["Yes", "No"]
        }
    ]).then(response => {
        if (response.doneWithApp === "Yes") {
            console.log("Good luck trading.");
        } else {
            beginApp();
        };
    });
};

// "logTradePrompt" function
// This function asks the user if they would like to log their trade to the respective .txt file.
logTradePrompt = (txtFileName, output) => {
    inquirer.prompt([
        {
            type: "list",
            name: "logTrade",
            message: `Would you like record this to the log file?`,
            choices: ["Yes", "No"]
        }
    ]).then(response => {
        if (response.logTrade === "Yes") {
            fs.appendFile(txtFileName, `${output}\n`, (error) => {
                if (error) throw error;
            });
        };
        askIfDone();
    });
};

// "newEntryTrade()" function
// This function runs when the user wants to create a new entry (buy) trade.
newEntryTrade = (currency) => {

    // This function runs if the user chooses to trade alts using USD. They can trade USD-BTC-Alts, USD-ETH-Alts, or strictly using 
    // USD paired with a cryptocurrency (the last option is for trading on Robinhood.)
    usdEntryTrade = (tradingPair) => {

        // This function is called when a user makes an entry through Coinbase (buying BTC or ETH) then using it to trade alts on Binance.
        // (tradingPair === "BTC" or "ETH")
        coinbaseEntry = () => {
            inquirer.prompt([
                {
                    type: "input",
                    name: "investment",
                    message: "Enter total investment (USD):",
                    // validate: validateNumber(investment)
                    validate: validateInvestment = (investment) => {
                        var flag = true;
                        var values = /^[\d.]+$/;
                        if (!values.test(investment)) {
                            flag = "Please enter valid input.";
                        };
                        return flag;
                    }
                },
                {
                    type: "input",
                    name: "coinPrice",
                    message: `Enter ${tradingPair} price (bought):`,
                    // validate: validateNumber(btcPrice)
                    validate: validateCoinPrice = (coinPrice) => {
                        var flag = true;
                        var values = /^[\d.]+$/;
                        if (!values.test(coinPrice)) {
                            flag = "Please enter valid input.";
                        };
                        return flag;
                    }
                },
                {
                    type: "input",
                    name: "altName",
                    message: "Enter name of altcoin bought:",
                    // validate: validateName(altName)
                    validate: validateAltName = (altName) => {
                        var flag = true;
                        var values = /^[\a-zA-z]+$/;
                        if (!values.test(altName)) {
                            flag = "Please enter valid input.";
                        };
                        return flag;
                    }
                },
                {
                    type: "input",
                    name: "altPrice",
                    message: `Enter price of altcoin (in ${tradingPair}):`,
                    // validate: validateNumber(altPrice)
                    validate: validateAltPrice = (altPrice) => {
                        var flag = true;
                        var values = /^[\d.]+$/;
                        if (!values.test(altPrice)) {
                            flag = "Please enter valid input.";
                        };
                        return flag;
                    }
                }
            ]).then(response => {
                var totalCrypto = parseFloat(response.investment) / parseFloat(response.coinPrice);
                var actualCrypto = totalCrypto - (totalCrypto * .04);
                var transferredCrypto = actualCrypto - .00000700;
                var totalCoins = transferredCrypto / parseFloat(response.altPrice);
                var exchFee = totalCoins * .001;
                var actualCoins = totalCoins - exchFee;
                var entryPriceUSD = parseFloat(response.investment) / actualCoins;
                var entryPriceCrypto = transferredCrypto / actualCoins;
                var output = `* New entry trade (USD/${tradingPair}) *
                Cryptocurrency: ${response.altName}
                Initial investment: $${response.investment}
                Bought ${tradingPair} at: $${response.coinPrice} per ${tradingPair}
                Total ${tradingPair} available (after all fees): ${transferredCrypto.toFixed(8)} ${tradingPair}
                Bought ${response.altName} at: ${response.altPrice} ${tradingPair}
                Total coins bought: ${actualCoins} ${response.altName}
                Entry price (USD): $${entryPriceUSD.toFixed(5)} (factoring in Coinbase fee, transfer fee and Binance fee)
                Entry price (${tradingPair}): ${entryPriceCrypto.toFixed(8)} ${tradingPair} (factoring in Coinbase fee, transfer fee and Binance fee)
                Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{4})+/gm, '')
                console.log(output);
                logTradePrompt(`logs/entries_log/entries_USD/entries_USD_${tradingPair}.txt`, output);
            });
        };

        // This function is called is when a user trades on Robinhood - a zero fee platform, strictly trading in USD.
        // (tradingPair === "none").
        robinhoodEntry = () => {
            inquirer.prompt([
                {
                    type: "input",
                    name: "investment",
                    message: "Enter total investment (USD):",
                    // validate: validateNumber(investment)
                    validate: validateInvestment = (investment) => {
                        var flag = true;
                        var values = /^[\d.]+$/;
                        if (!values.test(investment)) {
                            flag = "Please enter valid input.";
                        };
                        return flag;
                    }
                },
                {
                    type: "input",
                    name: "coinName",
                    message: "Enter name of cryptocurrency bought:",
                    // validate: validateName(coinName)
                    validate: validateCoinName = (coinName) => {
                        var flag = true;
                        var values = /^[\a-zA-z]+$/;
                        if (!values.test(coinName)) {
                            flag = "Please enter valid input.";
                        };
                        return flag;
                    }
                },
                {
                    type: "input",
                    name: "coinPrice",
                    message: "Enter price of cryptocurrency:",
                    // validate: validateNumber(coinPrice)
                    validate: validateCoinPrice = (coinPrice) => {
                        var flag = true;
                        var values = /^[\d.]+$/;
                        if (!values.test(coinPrice)) {
                            flag = "Please enter valid input.";
                        };
                        return flag;
                    }
                }
            ]).then(response => {
                var totalCrypto = parseFloat(response.investment) / parseFloat(response.coinPrice);
                var output = `* New entry trade (USD) - Robinhood *
                Cryptocurrency: ${response.coinName}
                Initial investment: $${response.investment}
                Bought ${response.coinName} at: $${response.coinPrice}
                Total coins bought: ${totalCrypto} ${response.coinName}
                Entry price: $${parseFloat(response.coinPrice).toFixed(6)}
                Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{4})+/gm, '')
                console.log(output);
                logTradePrompt("logs/entries_log/entries_USD/entries_USD_RH.txt", output);
            });
        };

        // Logic that determines what trading pair was used / what function to be executed.
        if (tradingPair === "None (Robinhood Trade)") {
            robinhoodEntry();
        } else {
            coinbaseEntry();
        };

    };

    // This function runs if the user chooses to trade alts using USDT. They can trade USDT-BTC-Alts, USDT-ETH-Alts, or strictly using 
    // USDT paired with an alt.
    usdtEntryTrade = (tradingPair) => {

        // If the user chooses to make an entry strictly with USDT (tradingPair === "None")
        usdtOnlyEntry = () => {
            inquirer.prompt([
                {
                    type: "input",
                    name: "investment",
                    message: "Enter total investment (USDT):"
                },
                {
                    type: "input",
                    name: "coinName",
                    message: "Enter name of cryptocurrency bought:"
                },
                {
                    type: "input",
                    name: "coinPrice",
                    message: "Enter price of cryptocurrency:"
                }
            ]).then(response => {
                var totalCrypto = parseFloat(response.investment) / parseFloat(response.coinPrice);
                var actualCrypto = totalCrypto - (totalCrypto * .001); // 1% trading fee
                var entryPriceUSDT = parseFloat(response.investment) / actualCrypto;
                var output = `* New entry trade (USDT) *
                Cryptocurrency: ${response.coinName}
                Initial investment: $${response.investment} (Tether)
                Bought ${response.coinName} at: $${response.coinPrice}
                Total coins bought: ${actualCrypto} ${response.coinName}
                Entry price (USDT): $${entryPriceUSDT.toFixed(5)} (factoring in Binance fee)
                Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{2})+/gm, '');
                console.log(output);
                logTradePrompt("logs/entries_log/entries_USDT/entries_USDT.txt", output);
            });
        };


        // If the user chooses to make a USDT entry through BTC or ETH (tradingPair === "BTC" || tradingPair === "ETH")
        cryptoPairEntry = () => {
            inquirer.prompt([
                {
                    type: "input",
                    name: "investment",
                    message: "Enter total investment (USDT):"
                },
                {
                    type: "input",
                    name: "coinPrice",
                    message: `Enter ${tradingPair} price (bought):`
                },
                {
                    type: "input",
                    name: "altName",
                    message: "Enter name of altcoin bought:"
                },
                {
                    type: "input",
                    name: "altPrice",
                    message: `Enter price of altcoin (in ${tradingPair}):`
                }
            ]).then(response => {
                var totalCrypto = parseFloat(response.investment) / parseFloat(response.coinPrice);
                var actualCrypto = totalCrypto - (totalCrypto * .001); // 1% trading fee
                var totalCoins = actualCrypto / parseFloat(response.altPrice);
                var actualCoins = totalCoins - (totalCoins * .001); // 1% trading fee
                var entryPriceUSDT = parseFloat(response.investment) / actualCoins;
                var entryPriceCrypto = actualCrypto / actualCoins;
                var output = `* New entry trade (USDT/${tradingPair}) *
                Cryptocurrency: ${response.altName}
                Initial investment: $${response.investment} (Tether)
                Bought ${tradingPair} at: $${response.coinPrice} per ${tradingPair}
                Total ${tradingPair} available (after all fees): ${actualCrypto.toFixed(8)} ${tradingPair}
                Bought ${response.altName} at: ${response.altPrice} ${tradingPair}
                Total coins bought: ${actualCoins} ${response.altName}
                Entry price (USDT): $${entryPriceUSDT.toFixed(5)} (factoring in Binance fees)
                Entry price (${tradingPair}): ${entryPriceCrypto.toFixed(8)} ${tradingPair} (factoring in Binance fees)
                Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{2})+/gm, '');
                console.log(output);
                logTradePrompt(`logs/entries_log/entries_USDT/entries_USDT_${tradingPair}.txt`, output);
            });
        };

        // Logic that determines what trading pair was used / what function to be executed.
        if (tradingPair === "None") {
            usdtOnlyEntry();
        } else {
            cryptoPairEntry();
        };

    };

    // This function runs if the user chooses to trade alts in BTC, ETH, or BNB.
    cryptoEntryTrade = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "investment",
                message: `Enter total investment (${currency}):`
            },
            {
                type: "input",
                name: "altName",
                message: "Enter name of altcoin bought:"
            },
            {
                type: "input",
                name: "altPrice",
                message: `Enter price of altcoin (in ${currency}):`
            }
        ]).then(response => {
            var totalCoins = parseFloat(response.investment) / parseFloat(response.altPrice);
            var actualCoins = totalCoins - (totalCoins * .001); // 1% trading fee
            var entryPrice = parseFloat(response.investment) / actualCoins;
            switch (currency) {
                case "BTC":
                case "ETH":
                    entryPrice = entryPrice.toFixed(8)
                    break;
                case "BNB":
                    entryPrice = entryPrice.toFixed(5)
                    break;
            };
            var output = `* New entry trade (${currency}) *
            Cryptocurrency: ${response.altName}
            Initial investment: ${response.investment} ${currency}
            Bought ${response.altName} at: ${response.altPrice} ${currency}
            Total coins bought: ${actualCoins} ${response.altName}
            Entry price (${currency}): ${entryPrice} ${currency} (factoring in Binance fee)
            Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{2})+/gm, '');
            console.log(output);
            logTradePrompt(`logs/entries_log/entries_CRYPTO/entries_${currency}.txt`, output);
        });
    };

    // Logic that determines which function to run: if the currency chosen is USD, prompt user to choose trading pair and call the 
    // usdEntryTrade() function, passing in the user's response as a parameter. If the currency chosen is USDT, prompt the user to choose 
    // trading pair, and call the usdtEntryTrade() function, passing in the user's response as a parameter. If the currency chosen is 
    // BTC, ETH, or BNB, call the cryptoEntryTrade() function.
    if (currency === "USD") {
        inquirer.prompt([
            {
                type: "list",
                name: "tradingPair",
                message: "Choose your trading pair:",
                choices: ["BTC", "ETH", "None (Robinhood Trade)"]
            }
        ]).then(response => {
            usdEntryTrade(response.tradingPair);
        });
    } else if (currency === "USDT") {
        inquirer.prompt([
            {
                type: "list",
                name: "tradingPair",
                message: "Choose your trading pair:",
                choices: ["BTC", "ETH", "None"]
            }
        ]).then(response => {
            usdtEntryTrade(response.tradingPair);
        });
    } else {
        cryptoEntryTrade();
    };

};

// This space will hold the new command functions to make a new exit trade.
//=======================================================================================================================================

// "newExitTrade()" function
// This function runs when the user wants to create a new exit (sell) trade.
newExitTrade = (currency) => {

    // This function runs if the user chooses to trade alts using USD. They can trade USD-BTC-Alts, USD-ETH-Alts, or strictly using 
    // USD paired with a cryptocurrency (the last option is for trading on Robinhood.)
    usdExitTrade = (tradingPair) => {

        // This function is called when a user makes an entry through Coinbase (buying BTC or ETH) then using it to trade alts on Binance.
        coinbaseExit = () => {

        };

        // This function is called is when a user trades on Robinhood - a zero fee platform, strictly trading in USD.
        // (tradingPair === "none").
        robinhoodExit = () => {

        };

        // Logic that determines what trading pair was used / what function to be executed.
        if (tradingPair === "None (Robinhood Trade)") {
            robinhoodExit();
        } else {
            coinbaseExit();
        };

    };

    // This function runs if the user chooses to trade alts using USDT. They can trade USDT-BTC-Alts, USDT-ETH-Alts, or strictly using 
    // USDT paired with an alt.
    usdtExitTrade = (tradingPair) => {

        // If the user chooses to make an exit strictly with USDT (tradingPair === "None")
        usdtOnlyExit = () => {

        };

        // If the user chooses to make a USDT entry through BTC or ETH (tradingPair === "BTC" || tradingPair === "ETH")
        cryptoPairExit = () => {

        };

        // Logic that determines what trading pair was used / what function to be executed.
        if (tradingPair === "None") {
            usdtOnlyExit();
        } else {
            cryptoPairExit();
        };

    };

    // This function runs if the user chooses to trade alts in BTC, ETH, or BNB.
    cryptoExitTrade = () => {

    };

    // Logic that determines which function to run: if the currency chosen is USD, prompt user to choose trading pair and call the 
    // usdExitTrade() function, passing in the user's response as a parameter. If the currency chosen is USDT, prompt the user to choose 
    // trading pair, and call the usdtExitTrade() function, passing in the user's response as a parameter. If the currency chosen is 
    // BTC, ETH, or BNB, call the cryptoExitTrade() function.
    if (currency === "USD") {
        inquirer.prompt([
            {
                type: "list",
                name: "tradingPair",
                message: "Choose your trading pair:",
                choices: ["BTC", "ETH", "None (Robinhood Trade)"]
            }
        ]).then(response => {
            usdExitTrade(response.tradingPair);
        });
    } else if (currency === "USDT") {
        inquirer.prompt([
            {
                type: "list",
                name: "tradingPair",
                message: "Choose your trading pair:",
                choices: ["BTC", "ETH", "None"]
            }
        ]).then(response => {
            usdtExitTrade(response.tradingPair);
        });
    } else {
        cryptoExitTrade();
    };

};

//=======================================================================================================================================

// "newExitTradeUSD()" function
// This function runs when the user wants to create a new exit (sell) trade. By using inquirer, the user is prompted for the name of the 
// altcoin they sold, the amount of conis / tokens they sold, the price they sold the altcoin at (altcoin price is in BTC), then the price
// they sold Bitcoin at in the end. This function assumes the user is selling altcoin / selling BTC on Binance with a 0.1% purchase on the 
// altcoin sell and BTC sell each.
newExitTradeUSD = () => {
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
    ]).then(response => {
        var totalBTC = parseFloat(response.numCoinsSold) * parseFloat(response.altPrice);
        var exchFee = totalBTC * .001;
        var actualBTC = totalBTC - exchFee;
        var transferredBTC = actualBTC - .0005;
        var divestment = transferredBTC * parseFloat(response.btcPrice);
        var actualDivestment = divestment - (divestment * .04);
        var exitPrice = actualDivestment / parseFloat(response.numCoinsSold);
        var output = `* New exit trade (USD) *
        Cryptocurrency: ${response.altName} 
        Amount of coins / tokens sold: ${response.numCoinsSold} ${response.altName}
        Sold ${response.altName} at: ${response.altPrice} BTC
        Sold Bitcoin at: $${response.btcPrice} per BTC
        Total Bitcoin sold: ${transferredBTC.toFixed(8)} BTC
        Final divestment: $${actualDivestment} (factoring in Binance fee, transfer fee and Coinbase fee)
        Exit price: $${exitPrice.toFixed(5)} (factoring in Binance fee, transfer fee and Coinbase fee)
        Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{2})+/gm, '');
        console.log(output);
        logTradePrompt('logs/exits_log/exits_USD.txt', output);
    });
};

// "newExitTradeUSDT()" function
// This function runs when the user wants to create a new exit (sell) trade back to USDT (Tether). By using inquirer, the user is prompted 
// for the name of the altcoin they sold, the amount of conis / tokens they sold, the price they sold the altcoin at (altcoin price is in 
// BTC), then the price they sold Bitcoin at in the end. This function assumes the user is selling altcoin on Binance with a 0.1% trade 
// fee, charged a 0.00000700 BTC transfer fee to Coinbase, and a 4% trade fee at Coinbase when selling Bitcoin.
newExitTradeUSDT = () => {
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
    ]).then(response => {
        var totalBTC = parseFloat(response.numCoinsSold) * parseFloat(response.altPrice);
        var exchFee = totalBTC * .001;
        var actualBTC = totalBTC - exchFee;
        var totalUSDT = actualBTC * parseFloat(response.btcPrice);
        var exchFee2 = totalUSDT * .001;
        var actualUSDT = totalUSDT - exchFee2;
        var exitPriceUSDT = actualUSDT / parseFloat(response.numCoinsSold);
        var output = `* New exit trade (USDT) *
        Cryptocurrency: ${response.altName}
        Amount of coins / tokens sold: ${response.numCoinsSold} ${response.altName}
        Sold ${response.altName} at: ${response.altPrice} BTC
        Sold Bitcoin at: $${response.btcPrice} per BTC
        Total Bitcoin sold: ${actualBTC.toFixed(8)} BTC
        Total USDT: $${actualUSDT.toFixed(5)} (factoring in Binance fees)
        Exit price: $${exitPriceUSDT.toFixed(5)} (factoring in Binance fees)
        Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{2})+/gm, '');
        console.log(output);
        logTradePrompt('logs/exits_log/exits_USDT.txt', output);
    });
};

// "newExitTradeBTC()" function
// This function runs when the user wants to create a new exit (sell) trade strictly in BTC. By using inquirer, the user is prompted for 
// the name of the altcoin they bought, the number of coins / tokens sold, and the price they sold the altcoin at (price is in BTC). This 
// function assumes the user is trading the altcoin on Binance with a 0.1% trade fee when selling altcoins.
newExitTradeBTC = () => {
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
    ]).then(response => {
        var totalBTC = parseFloat(response.numCoinsSold) * parseFloat(response.altPrice);
        var exchFee = totalBTC * .001;
        var actualBTC = totalBTC - exchFee;
        var exitPriceBTC = actualBTC / parseFloat(response.numCoinsSold);
        var output = `* New exit trade (BTC) *
        Cryptocurrency: ${response.altName}
        Amount of coins / tokens sold: ${response.numCoinsSold} ${response.altName}
        Sold ${response.altName} at: ${response.altPrice} BTC
        Total BTC: ${actualBTC.toFixed(8)} BTC (factoring in Binance fee)
        Exit price: ${exitPriceBTC.toFixed(8)} BTC (factoring in Binance fee)
        Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{2})+/gm, '');
        console.log(output);
        logTradePrompt('logs/exits_log/exits_BTC.txt', output);
    });
};

// "newExitTradeETH() function"
// This function runs when the user...
newExitTradeETH = () => {

};

// "newExitTradeBNB() function"
// This function runs when the user...
newExitTradeBNB = () => {

};

// "calcAvgEntryPriceUSD()" function
// This function runs when the user wants to find the average entry price of multiple entries on a cryptocurrency. It asks the user 
// for their entry prices in USD separated by a comma, entry prices in BTC separated by a comma, and the amount of altcoins / tokens 
// obtained on each investment separated by a comma. It then performs a weighted average calculation to find the weighted average entry 
// prices in both USD and BTC. The user must input data logged in their entries_USD.txt and entries_BTC.txt files to make an average 
// USD / BTC entry price calculation.
calcAvgEntryPriceUSD = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "altName",
            message: "Enter name of altcoin: "
        },
        {
            type: "input",
            name: "entryPricesUSD",
            message: "Enter all entry prices in USD one by one, separated by a comma: "
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
    ]).then(response => {
        var entryPricesUSDArr = response.entryPricesUSD.split(", ");
        var entryPricesBTCArr = response.entryPricesBTC.split(", ");
        var numCoinsArr = response.numCoinsPerInvestment.split(", ");
        if (entryPricesUSDArr.length !== entryPricesBTCArr.length || entryPricesUSDArr.length !== numCoinsArr.length
            || entryPricesBTCArr.length !== numCoinsArr.length) {
            console.log("\nERROR: There was an error in your input");
            calcAvgEntryPriceUSD();
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
            var output = `* New average entry calculation *
            Cryptocurrency: ${response.altName}
            Entries (USD): ${entryPricesStrUSD.trim().slice(0, -1)}
            Entries (BTC): ${entryPricesStrBTC.trim().slice(0, -1)}
            Sum of total investments (USD): $${weightedAvgNumeratorUSD.toFixed(0)}
            Sum of total investments (BTC): ${weightedAvgNumeratorBTC.toFixed(8)} BTC
            Sum of total coins / tokens obtained: ${sumTotalCoins} ${response.altName}
            Average entry price (USD): $${avgEntryPriceUSD.toFixed(5)} (after all fees)
            Average entry price (BTC): ${avgEntryPriceBTC.toFixed(8)} BTC (after all fees)\n`.replace(/^(\s{3})+/gm, '');
            console.log(output);
            logTradePrompt('./avg_entries_USDX.txt', output);
        };
    });
};

// "calcAvgEntryPriceBTC()" function
// This function runs when the user wants to find the average entry price of multiple entries strictly made in BTC on a cryptocurrency. 
// It asks the user for their entry prices in BTC separated by a comma, and the amount of altcoins / tokens obtained on each investment 
// separated by a comma. It then performs a weighted average calculation to find the weighted average entry price in BTC. The user must 
// input data logged in their entries_BTC.txt file to make an average BTC entry price calculation.
calcAvgEntryPriceBTC = () => {
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
    ]).then(response => {
        var entryPricesBTCArr = response.entryPricesBTC.split(", ");
        var numCoinsArr = response.numCoinsPerInvestment.split(", ");
        // Error check: make sure num of entry prices is the same as num of times tokens were obtained (bought)
        if (entryPricesBTCArr.length !== numCoinsArr.length) {
            console.log("\nERROR: There was an error in your input");
            calcAvgEntryPriceBTC();
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
            var output = `* New average entry calculation *
            Cryptocurrency: ${response.altName}
            Entries (BTC): ${entryPricesStrBTC.trim().slice(0, -1)}
            Sum of total investments (BTC): ${weightedAvgNumeratorBTC.toFixed(8)} BTC
            Sum of total coins / tokens obtained: ${sumTotalCoins} ${response.altName}
            Average entry price (BTC): ${avgEntryPriceBTC.toFixed(8)} BTC (after all fees)\n`.replace(/^(\s{3})+/gm, '');
            console.log(output);
            logTradePrompt('./avg_entries_BTC.txt', output);
        };
    });
};

// "calcAvgEntryPriceETH() function"
// This function runs when the user...
calcAvgEntryPriceETH = () => {

};

// "calcAvgEntryPriceBNB() function"
// This function runs when the user...
calcAvgEntryPriceBNB = () => {

};

// "calcRoi()" function
// This function runs when the user wants to calculate their return of investment. The user has 4 currencies they can calculate ROI in:
// USD, BTC, ETH, and BNB. If the user chooses USD, the ROI is calculated in strictly USD. If the user chooses a cryptocurrency, they 
// can choose to keep their ROI in the cryptocurrency they were trading in, or take their ROI back in USD.
calcRoi = (currency) => {

    usdRoi = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "cryptoName",
                message: "Enter name of cryptocurrency traded: "
            },
            {
                type: "input",
                name: "investmentUSD",
                message: "Enter initial investment (in USD): "
            },
            {
                type: "input",
                name: "divestmentUSD",
                message: "Enter final divesment (in USD): "
            },
        ]).then(response => {
            var netChangeUSD = parseFloat(response.divestmentUSD) - parseFloat(response.investmentUSD);
            var roiDecimalUSD = parseFloat(response.divestmentUSD) / parseFloat(response.investmentUSD);
            var roiPercentUSD = (roiDecimalUSD - 1) * 100;
            var output;
            if (netChangeUSD >= 0) {
                output = `* New ROI calculation *
                Cryptocurrency: ${response.cryptoName}
                Initial investment (USD): $${response.investmentUSD}
                Final divestment (USD): $${response.divestmentUSD}
                Return of investment (decimal): ${roiDecimalUSD.toFixed(2)}x ROI
                Return of investment (percent): ${roiPercentUSD.toFixed(2)}% ROI
                Total profit: $${netChangeUSD.toFixed(2)}
                Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{4})+/gm, '');
            } else {
                netChangeUSD = netChangeUSD * -1;
                output = `* New ROI calculation *
                Cryptocurrency: ${response.cryptoName}
                Initial investment: $${response.investmentUSD}
                Final divestment: $${response.divestmentUSD} 
                Return of investment (decimal): ${roiDecimalUSD.toFixed(2)}x ROI
                Return of investment (percent): ${roiPercentUSD.toFixed(2)}% ROI
                Total USD loss: $${netChangeUSD.toFixed(2)}
                Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{4})+/gm, '');
            };
            console.log(output);
            logTradePrompt('./roi.txt', output);
        });
    };

    // The cryptoRoi() function is executed to calculate ROI if the user traded alts in BTC, ETH, or BNB.
    cryptoRoi = () => {

        // The cryptoProfit() function is executed if the user chooses to keep ROI in the currency they traded in.
        cryptoProfit = () => {
            inquirer.prompt([
                {
                    type: "input",
                    name: "altName",
                    message: "Enter name of altcoin traded: "
                },
                {
                    type: "input",
                    name: "investmentCoin",
                    message: `Enter initial investment (in ${currency}): `
                },
                {
                    type: "input",
                    name: "divestmentCoin",
                    message: `Enter final divesment (in ${currency}): `
                }
            ]).then(response => {
                var netChangeCoin = parseFloat(response.divestmentCoin) - parseFloat(response.investmentCoin);
                var roiDecimalCoin = parseFloat(response.divestmentCoin) / parseFloat(response.investmentCoin);
                var roiPercentCoin = (roiDecimalCoin - 1) * 100;
                var output;
                if (netChangeCoin >= 0) {
                    if (currency === "BNB") {
                        netChangeCoin = netChangeCoin.toFixed(5);
                    } else {
                        netChangeCoin = netChangeCoin.toFixed(8);
                    };
                    output = `* New ROI calculation *
                    Cryptocurrency: ${response.altName}
                    Initial investment: ${response.investmentCoin} ${currency} 
                    Final divestment: ${response.divestmentCoin} ${currency}
                    Return of investment (decimal): ${roiDecimalCoin.toFixed(2)}x ROI
                    Return of investment (percent): ${roiPercentCoin.toFixed(2)}% ROI
                    Total profit: ${netChangeCoin} ${currency}
                    Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{4})+/gm, '');
                } else {
                    if (currency === "BNB") {
                        netChangeCoin = netChangeCoin.toFixed(5) * -1;
                    } else {
                        netChangeCoin = netChangeCoin.toFixed(8) * -1;
                    };
                    netChangeUSD = netChangeUSD * -1;
                    output = `* New ROI calculation *
                    Cryptocurrency: ${response.altName}
                    Initial investment: ${response.investmentCoin} ${currency}
                    Final divestment: ${response.divestmentCoin} ${currency}
                    Return of investment (decimal): ${roiDecimalCoin.toFixed(2)}x ROI
                    Return of investment (percent): ${roiPercentCoin.toFixed(2)}% ROI
                    Total loss: ${netChangeCoin} ${currency}
                    Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{5})+/gm, '');
                };
                console.log(output);
                logTradePrompt('./roi.txt', output);
            });
        };

        // The usdProfit() function is executed if the user chooses to take ROI in USD.
        usdProfit = () => {
            inquirer.prompt([
                {
                    type: "input",
                    name: "altName",
                    message: "Enter name of altcoin traded: "
                },
                {
                    type: "input",
                    name: "investmentUSD",
                    message: "Enter initial investment (in USD): "
                },
                {
                    type: "input",
                    name: "investmentCoin",
                    message: `Enter initial investment (in ${currency}): `
                },
                {
                    type: "input",
                    name: "divestmentUSD",
                    message: "Enter final divesment (in USD): "
                },
                {
                    type: "input",
                    name: "divestmentCoin",
                    message: `Enter final divesment (in ${currency}): `
                }
            ]).then(response => {
                var netChangeUSD = parseFloat(response.divestmentUSD) - parseFloat(response.investmentUSD);
                var roiDecimalUSD = parseFloat(response.divestmentUSD) / parseFloat(response.investmentUSD);
                var roiPercentUSD = (roiDecimalUSD - 1) * 100;
                var netChangeCoin = parseFloat(response.divestmentCoin) - parseFloat(response.investmentCoin);
                var roiDecimalCoin = parseFloat(response.divestmentCoin) / parseFloat(response.investmentCoin);
                var roiPercentCoin = (roiDecimalCoin - 1) * 100;
                var output;
                if (netChangeUSD >= 0 && netChangeCoin >= 0) {
                    if (currency === "BNB") {
                        netChangeCoin = netChangeCoin.toFixed(5);
                    } else {
                        netChangeCoin = netChangeCoin.toFixed(8);
                    };
                    output = `* New ROI calculation *
                    Cryptocurrency: ${response.altName}
                    Initial investment (USD): $${response.investmentUSD}
                    Initial investment (${currency}): ${response.investmentCoin} ${currency} 
                    Final divestment (USD): $${response.divestmentUSD}
                    Final divestment (${currency}): ${response.divestmentCoin} ${currency}
                    Return of investment in USD (decimal): ${roiDecimalUSD.toFixed(2)}x ROI
                    Return of investment in USD (percent): ${roiPercentUSD.toFixed(2)}% ROI
                    Return of investment in ${currency} (decimal): ${roiDecimalCoin.toFixed(2)}x ROI
                    Return of investment in ${currency} (percent): ${roiPercentCoin.toFixed(2)}% ROI
                    Total USD profit: $${netChangeUSD.toFixed(2)}
                    Total ${currency} profit: ${netChangeCoin} ${currency}
                    Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{4})+/gm, '');
                } else {
                    if (currency === "BNB") {
                        netChangeCoin = netChangeCoin.toFixed(5) * -1;
                    } else {
                        netChangeCoin = netChangeCoin.toFixed(8) * -1;
                    };
                    netChangeUSD = netChangeUSD * -1;
                    output = `* New ROI calculation *
                    Cryptocurrency: ${response.altName}
                    Initial investment (USD): $${response.investmentUSD}
                    Initial investment (${currency}): ${response.investmentCoin} ${currency}
                    Final divestment (USD): $${response.divestmentUSD} 
                    Final divestment (${currency}): ${response.divestmentCoin} ${currency}
                    Return of investment in USD (decimal): ${roiDecimalUSD.toFixed(2)}x ROI
                    Return of investment in USD (percent): ${roiPercentUSD.toFixed(2)}% ROI
                    Return of investment in ${currency} (decimal): ${roiDecimalCoin.toFixed(2)}x ROI
                    Return of investment in ${currency} (percent): ${roiPercentCoin.toFixed(2)}% ROI
                    Total USD loss: $${netChangeUSD.toFixed(2)}
                    Total ${currency} loss: ${netChangeCoin} ${currency}
                    Date logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`.replace(/^(\s{5})+/gm, '');
                };
                console.log(output);
                logTradePrompt('./roi.txt', output);
            });
        };

        // Start of prompt inside cryptoRoi(): user chooses to keep their ROI in crypto, or trade it back to USD
        inquirer.prompt([
            {
                type: "list",
                name: "type",
                message: "Choose from the following:",
                choices: [`Calculate ${currency} ROI`, `Calculate USD & ${currency} ROI`]
            }
        ]).then(response => {
            if (response.type === `Calculate ${currency} ROI`) {
                cryptoProfit();
            } else {
                usdProfit();
            };
        });
    };

    // Logic that determines which function to run: if currency traded in was USD, run usdROI(). If user traded in a cryptocurrency, run 
    // cryptoRoi().
    if (currency === "USD") {
        usdRoi();
    } else {
        cryptoRoi();
    };

};

// "getTargetPrice()" function
// This function runs when the user wants to make a quick calculation to find the price they need to sell at, for a certain percentage 
// gain. The user is asked to enter an entry price in the currency they chose in the targetPricePrompt() function and the percentage gain 
// they are looking for to find the target sell price.
getTargetPrice = (currency) => {
    inquirer.prompt([
        {
            type: "input",
            name: "entryPrice",
            message: `Enter entry price (in ${currency}):`
        },
        {
            type: "input",
            name: "targetPercentChange",
            message: "Enter percent gain you're looking for:"
        }
    ]).then(response => {
        var convertedPercentChange = parseFloat(response.targetPercentChange) * .01;
        var targetPrice = parseFloat(response.entryPrice) + (parseFloat(response.entryPrice) * convertedPercentChange);
        var entryPriceOutput, percentChangeOutput, targetPriceOutput;
        switch (currency) {
            case "USD":
                entryPriceOutput = `Entry price: $${response.entryPrice}`;
                percentChangeOutput = `Percent gain looking for: ${response.targetPercentChange}%`;
                targetPriceOutput = `Target sell price: $${targetPrice.toFixed(5)}`;
                break;
            case "BTC":
            case "ETH":
                entryPriceOutput = `Entry price: ${response.entryPrice} ${currency}`;
                percentChangeOutput = `Percent gain looking for: ${response.targetPercentChange}%`;
                targetPriceOutput = `Target sell price: ${targetPrice.toFixed(8)} ${currency}`;
                break;
            case "BNB":
                entryPriceOutput = `Entry price: ${response.entryPrice} ${currency}`;
                percentChangeOutput = `Percent gain looking for: ${response.targetPercentChange}%`;
                targetPriceOutput = `Target sell price: ${targetPrice.toFixed(5)} ${currency}`;
                break;
        };
        console.log(`\n${entryPriceOutput}
        ${percentChangeOutput}
        ${targetPriceOutput}\n`.replace(/^(\s{2})+/gm, ''));
        askIfDone();
    });
};

// "getPercentChange()" function
// This function runs when the user wants to find the percentage change of a trade. The user is asked to enter an entry price and exit 
// price in the currency they chose in the percentChangePrompt() function to find the percentage change.
getPercentChange = (currency) => {
    inquirer.prompt([
        {
            type: "input",
            name: "entryPrice",
            message: `Enter entry price (in ${currency}):`
        },
        {
            type: "input",
            name: "exitPrice",
            message: `Enter exit price (in ${currency}):`
        }
    ]).then(response => {
        var decimalChange = parseFloat(response.exitPrice) / parseFloat(response.entryPrice);
        var percentChange = (decimalChange - 1) * 100;
        var entryOutput, exitOutput;
        if (currency === "USD") {
            entryOutput = `Entry price: $${response.entryPrice}`;
            exitOutput = `Exit price: $${response.exitPrice}`;
        } else {
            entryOutput = `Entry price: ${response.entryPrice} ${currency}`;
            exitOutput = `Exit price: ${response.exitPrice} ${currency}`;
        };
        console.log(`\n${entryOutput}
        ${exitOutput}
        Decimal change: ${decimalChange.toFixed(2)}x
        Percent change: ${percentChange.toFixed(2)}%\n`.replace(/^(\s{2})+/gm, ''));
        askIfDone();
    });
};

// Call "beginApp()" to begin app
beginApp();

// To do:
// 1. Complete option to trade in Ethereum
// 2. Complete option to trade in BNB
// 3. Add validation to all functions, make sure to check for input errors --- check why validating functions won't work
// 4. Double check average entry functions - sum total investments may have bug
// 5. Create database on MongoDB to make calculating avg entry prices easier
// 6. ES6 - use const and let instead of var
