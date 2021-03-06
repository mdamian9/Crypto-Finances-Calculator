// USD -> BTC entry trade model (Coinbase -> Binance)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdBtcEntryTrade object
const tradeSchema = new Schema({
    currency: {
        type: String,
        trim: true,
        required: true
    },
    tradingPair: {
        type: String,
        trim: true,
        required: true
    },
    cryptocurrency: {
        type: String,
        trim: true,
        required: true
    },
    initialInvestment: {
        type: Number,
        required: true
    },
    btcPriceBought: {
        type: Number,
        required: true
    },
    totalBTC: {
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
    entryPriceBTC: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the USD -> BTC entry trade model using the trade schema
const UsdBtcEntryTrade = mongoose.model("UsdBtcEntryTrade", tradeSchema);

// Export the USD -> BTC entry trade model
module.exports = UsdBtcEntryTrade;
