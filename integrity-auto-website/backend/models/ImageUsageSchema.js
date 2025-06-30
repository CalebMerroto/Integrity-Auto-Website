// backend/models/imageSchema.js
const mongoose = require("mongoose");

const ImageUsageSchema = new mongoose.Schema({
  imgId: {
    type: String,
    required: true,
  },
  locId: {
    type: String,
    required: true,
    unique: true
  },
});



module.exports = mongoose.model("ImageUsage", ImageUsageSchema);
