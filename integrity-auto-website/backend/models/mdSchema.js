// backend/models/mdSchema.js
const mongoose = require("mongoose");

const mdSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("mdText", mdSchema);