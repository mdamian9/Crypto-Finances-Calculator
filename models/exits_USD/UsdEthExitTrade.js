// USD / ETH exit trade model

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdEthExitTrade object
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
    totalAlt: {
        type: Number,
        required: true
    },
    altPrice: {
        type: Number,
        required: true
    },
    totalETH: {
        type: Number,
        required: true
    },
    ethPriceSold: {
        type: Number,
        required: true,
    },
    finalDivestmentUSD: {
        type: Number,
        required: true
    },
    exitPriceUSD: {
        type: Number,
        required: true
    },
    exitPriceETH: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the USD / ETH exit trade model using the trade schema
const UsdEthExitTrade = mongoose.model("UsdEthExitTrade", tradeSchema);

// Export the USD / BTC exit trade model
module.exports = UsdEthExitTrade;
