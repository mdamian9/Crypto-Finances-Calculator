// USD -> BTC entry trade model

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with ustBtcEntryTrade object
const tradeSchema = new Schema({
    initialInvestment: {
        type: String,
        trim: true,
        require: true
    },
    btcPriceBought: {
        type: String,
        trim: true,
        require: true
    },
    altName: {
        type: String,
        trim: true,
        require: true
    },
    altPrice: {
        type: String,
        trim: true,
        require: true
    }
});

// Create the USD -> BTC entry trade model using the trade schema
const UsdBtcEntryTrade = mongoose.model("UsdBtcEntryTrade", tradeSchema);

// Export the USD -> BTC entry trade model
module.exports = UsdBtcEntryTrade;
