// backend/models/mdSchema.js
const mongoose = require("mongoose");

const mdSchema = new mongoose.schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: null, // Means not currently assigned
    },
})

module.exports = mongoose.model("mdText", mdSchema);