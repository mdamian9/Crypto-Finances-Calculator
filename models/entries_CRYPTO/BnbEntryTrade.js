// BNB entry trade model (Robinhood)

// Require "mongoose"
const mongoose = require("mongoose");

// Schema class created with mongoose schema method
const Schema = mongoose.Schema;

// Trade schema with BnbEntryTrade object
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
    entryPriceBNB: {
        type: Number,
        required: true
    },
    dateLogged: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the BNB entry trade model using the trade schema
const BnbEntryTrade = mongoose.model("BnbEntryTrade", tradeSchema);

// Export the BNB entry trade model
module.exports = BnbEntryTrade;
