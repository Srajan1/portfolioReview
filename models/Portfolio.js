const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    assets: [{
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true
        }
    }],
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    totalValue: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Portfolio', portfolioSchema);