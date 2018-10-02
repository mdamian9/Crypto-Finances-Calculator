// USD -> ETH entry trade model

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdEthEntryTrade object
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
    entryPriceUSD: {
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

// Create the USD -> ETH entry trade model using the trade schema
const UsdEthEntryTrade = mongoose.model("UsdEthEntryTrade", tradeSchema);

// Export the USD -> ETH entry trade model
module.exports = UsdEthEntryTrade;
