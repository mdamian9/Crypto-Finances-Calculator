// BTC exit trade model (Binance)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with BtcExitTrade object
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
    finalDivestmentBTC: {
        type: Number,
        required: true
    },
    exitPriceBTC: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the BTC exit trade model using the trade schema
const BtcExitTrade = mongoose.model("BtcExitTrade", tradeSchema);

// Export the BTC entry trade model
module.exports = BtcExitTrade;