// USDT entry trade model (Binance)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdtEntryTrade object
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
    cryptoPrice: {
        type: Number,
        required: true
    },
    totalCrypto: {
        type: Number,
        required: true
    },
    entryPriceUSDT: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the USDT entry trade model using the trade schema
const UsdtEntryTrade = mongoose.model("UsdtEntryTrade", tradeSchema);

// Export the USDT entry trade model
module.exports = UsdtEntryTrade;
