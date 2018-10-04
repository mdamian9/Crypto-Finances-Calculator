// USDT / ETH exit trade model (Binance)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdtEthExitTrade object
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
    finalDivestmentUSDT: {
        type: Number,
        required: true
    },
    exitPriceUSDT: {
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

// Create the USDT / BTC exit trade model using the trade schema
const UsdtEthExitTrade = mongoose.model("UsdtEthExitTrade", tradeSchema);

// Export the USDT / ETH exit trade model
module.exports = UsdtEthExitTrade;
