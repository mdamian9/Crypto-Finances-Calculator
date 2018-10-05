// ETH exit trade model (Binance)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with EthExitTrade object
const tradeSchema = new Schema({
    currency: {
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
    finalDivestmentETH: {
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

// Create the ETH exit trade model using the trade schema
const EthExitTrade = mongoose.model("EthExitTrade", tradeSchema);

// Export the ETH entry trade model
module.exports = EthExitTrade;
