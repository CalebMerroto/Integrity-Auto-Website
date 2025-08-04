const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    vehicle: {
        color: { type: String, required: true },
        year: { type: String, required: true },
        make: { type: String, required: true },
        model: { type: String, required: true },
        mileage: { type: Number, required: true },
        license: { type: String, required: true }
    },
    servicesNeeded: {
        type: Map,
        of: Boolean,
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    completedDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("ServiceInfo", serviceSchema)