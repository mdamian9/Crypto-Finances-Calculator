// Function returns entry amount by passing initial investment, current BTC price when buy was made, and current satoshi price of coin bought.
// This function assumes you are buying on Coinbase with a 4% purchase fee.
function getEntryPrice(investment, btcPrice, satPrice) {
    var entryPrice = 0;
    var totalBTC = investment / btcPrice;
    var actualBTC = totalBTC - (totalBTC * .04);
    var transferredBTC = actualBTC - 0.000014;
    var totalCoins = transferredBTC / satPrice;
    entryPrice = investment / totalCoins;
    // // Display all information about transaction to console
    // console.log("Total: " + totalBTC);
    // console.log("Actual: " + actualBTC);
    // console.log("Transferred: " + transferredBTC);
    // console.log("Coins: " + totalCoins);
    // console.log("Entry price: $" + entryPrice);
    // console.log("-------------------------------------------------------");
    return entryPrice;
};

// This array will hold all of our entry prices
var entries = [];

// Creating our entries and storing them in variables
var entry1 = getEntryPrice(100, 6400, .00000110);
var entry2 = getEntryPrice(200, 6500, .00000120);

// Pushing entries into array
entries.push(entry1);
entries.push(entry2);

// Display entries array
console.log(entries);

