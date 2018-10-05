// BNB exit trade model (Binance)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with BnbExitTrade object
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
    finalDivestmentBNB: {
        type: Number,
        required: true
    },
    exitPriceBNB: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the BNB exit trade model using the trade schema
const BnbExitTrade = mongoose.model("BnbExitTrade", tradeSchema);

// Export the BNB entry trade model
module.exports = BnbExitTrade;
