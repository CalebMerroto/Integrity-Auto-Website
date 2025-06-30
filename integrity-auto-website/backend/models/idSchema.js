const mongoose = require("mongoose");

const idSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  path: {
    type: [Number],
    required: true
  }
});

// Enforce unique combination of page + path
idSchema.index({ page: 1, path: 1 }, { unique: true });

module.exports = mongoose.model("ComponentID", idSchema);
