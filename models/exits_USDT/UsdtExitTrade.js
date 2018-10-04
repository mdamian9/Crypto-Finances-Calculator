// USDT exit trade model (Binance)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdtExitTrade object
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
    totalCrypto: {
        type: Number,
        required: true
    },
    cryptoPrice: {
        type: Number,
        required: true
    },
    finalDivestmentUSDT: {
        type: Number,
        required: true
    },
    exitPriceUSDT: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the USDT exit trade model using the trade schema
const UsdtExitTrade = mongoose.model("UsdtExitTrade", tradeSchema);

// Export the USDT exit trade model
module.exports = UsdtExitTrade;
