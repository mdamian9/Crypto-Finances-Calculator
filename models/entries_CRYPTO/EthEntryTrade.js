// ETH entry trade model (Binance)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with EthEntryTrade object
const tradeSchema = new Schema({
    cryptocurrency: {
        type: String,
        trim: true,
        required: true
    },
    initialInvestment: {
        type: Number,
        required: true
    },
    altPrice: {
        type: Number,
        required: true
    },
    totalAlt: {
        type: Number,
        required: true
    },
    entryPriceETH: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the ETH entry trade model using the trade schema
const EthEntryTrade = mongoose.model("EthEntryTrade", tradeSchema);

// Export the ETH entry trade model
module.exports = EthEntryTrade;
