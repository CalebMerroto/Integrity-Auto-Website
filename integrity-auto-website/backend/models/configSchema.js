// backend/models/configSchema.js
const mongoose = require("mongoose")

const configSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
})

module.exports = mongoose.model("config",configSchema)