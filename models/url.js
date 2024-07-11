const mongoose = require('mongoose')

const urlScheme = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,

    },
    redirectURL: {
        type: String,
        require: true,
    },
    vistHistory: [{ timestamp: { type: Number } }]
}, { timestamps: true })


const URL = mongoose.model('url', urlScheme)

module.exports = URL