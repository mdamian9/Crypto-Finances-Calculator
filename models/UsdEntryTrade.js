// USD entry trade model (Robinhood)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with UsdEntryTrade object
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
    cryptoPrice: {
        type: Number,
        required: true
    },
    totalCrypto: {
        type: Number,
        required: true
    },
    entryPriceUSD: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the USD entry trade model using the trade schema
const UsdEntryTrade = mongoose.model("UsdEntryTrade", tradeSchema);

// Export the USD entry trade model
module.exports = UsdEntryTrade;