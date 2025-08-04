const mongoose = require("mongoose");

const serviceDaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }],
    isFull: {
        type: Boolean,
        required: true,
        default: false
    }
});
module.exports = mongoose.model("ServicesOnDay", serviceDaySchema)