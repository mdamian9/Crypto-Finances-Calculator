// USD -> BTC entry trade model

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with ustBtcEntryTrade object
const tradeSchema = new Schema({
    initialInvestment: {
        type: Number,
        required: true
    },
    btcPriceBought: {
        type: Number,
        required: true
    },
    altName: {
        type: String,
        trim: true,
        required: true
    },
    altPrice: {
        type: Number,
        required: true
    }
});

// Create the USD -> BTC entry trade model using the trade schema
const UsdBtcEntryTrade = mongoose.model("UsdBtcEntryTrade", tradeSchema);

// Export the USD -> BTC entry trade model
module.exports = UsdBtcEntryTrade;
