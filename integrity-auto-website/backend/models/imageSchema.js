// models/imageSchema.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  usedIn: {
    type: [String], // Array of UUIDs or component identifiers
    default: [],
  },
  mimetype: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
