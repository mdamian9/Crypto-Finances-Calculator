// USD exit trade model (Robinhood)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdExitTrade object
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
    finalDivestmentUSD: {
        type: Number,
        required: true
    },
    exitPriceUSD: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the USD exit trade model using the trade schema
const UsdExitTrade = mongoose.model("UsdExitTrade", tradeSchema);

// Export the USD exit trade model
module.exports = UsdExitTrade;
