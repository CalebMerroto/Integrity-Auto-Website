// backend/server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose")
const cors = require("cors");
const configRoutes = require("./routes/configRoutes.js"); // Adjust if path differs
const imageRoutes = require("./routes/images.js"); 
const textRoutes = require("./routes/textRoutes.js") 
const idRoutes = require("./routes/idRoutes.js") 
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/integrity-auto", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "..", "build")));


app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use("/IntegrityAuto/config", configRoutes);
app.use("/IntegrityAuto/images", imageRoutes);
app.use("/IntegrityAuto/text", textRoutes);
app.use("/IntegrityAuto/id", idRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
