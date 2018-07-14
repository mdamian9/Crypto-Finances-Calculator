// Require fs package
var fs = require("fs");

// Take in user input and store into variables
var userCommand = process.argv[2];
var investment = parseFloat(process.argv[3]);
var btcPrice = parseFloat(process.argv[4]);
var coinName = process.argv[5];
var satPrice = parseFloat(process.argv[6]);

// Function returns entry amount by passing initial investment, current BTC price when buy was made, name of altcoin bought, and 
// current satoshi price of coin bought. This function assumes you are buying BTC on Coinbase with a 4% purchase fee and a 0.000014 BTC 
// transfer fee to altcoin exchange.
function newEntryTrade(investment, btcPrice, coinName, satPrice) {
    var entryPrice = 0;
    var totalBTC = investment / btcPrice;
    var actualBTC = totalBTC - (totalBTC * .04);
    var transferredBTC = actualBTC - 0.000014;
    var totalCoins = transferredBTC / satPrice;
    entryPrice = investment / totalCoins;
    var output = "* New entry *\nCryptocurrency: " + coinName + "\nInitial investment: $" + investment + "\nBTC Price bought at: $" +
        btcPrice + " per BTC\nBought " + coinName + " at: " + satPrice + " BTC\nTotal coins bought: " + totalCoins + " " + coinName + 
        "\nEntry price: $" + entryPrice + " (factoring in exchange fees & transfer fees)\n";
    console.log(output);
    // fs.appendFile('./log.txt', output + "\n", function (error) {
    //     if (error) throw error;
    // });
    return entryPrice;
};

function newExitTrade() {

};

// Function returns the average entry price of all investments made
function getEntryAverage(allEntries) {
    var total = 0;
    for (var i = 0; i < allEntries.length; i++) {
        total = total + allEntries[i];
    };
    var avgEntry = total / allEntries.length;
    // // Display average entry price
    console.log("Average entry price: " + avgEntry);
    return avgEntry;
};

switch (userCommand) {
    case "new-entry-trade":
        newEntryTrade(investment, btcPrice, coinName, satPrice);
    case "new-exit-trade" :
        newExitTrade()
}

// // This array will hold all of our entry prices
// var entries = [];

// // Creating our entries and storing them in variables
// var entry1 = getEntryPrice(100, 6400, .00000110);
// var entry2 = getEntryPrice(200, 6500, .00000120);

// // Pushing entries into array
// entries.push(entry1);
// entries.push(entry2);

// // Display entries array
// console.log(entries);
// getEntryAverage(entries);
