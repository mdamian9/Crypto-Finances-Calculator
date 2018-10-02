// USDT -> ETH entry trade model

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdtEthEntryTrade object
const tradeSchema = new Schema({
    cryptocurrency: {
        type: String,
        trim: true,
        required: true
    },
    initialInvestment: {
        type: Number,
        required: true
    },
    ethPriceBought: {
        type: Number,
        required: true
    },
    totalETH: {
        type: Number,
        required: true
    },
    altPrice: {
        type: Number,
        required: true
    },
    totalAlt: {
        type: Number,
        required: true
    },
    entryPriceUSDT: {
        type: Number,
        required: true
    },
    entryPriceETH: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the USDT -> ETH entry trade model using the trade schema
const UsdtEthEntryTrade = mongoose.model("UsdEthEntryTrade", tradeSchema);

// Export the USDT -> ETH entry trade model
module.exports = UsdtEthEntryTrade;
