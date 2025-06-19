// backend/routes/configRoutes.js
const express = require('express');
const router = express.Router();
const config = require('../models/configSchema');

router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const conf = await config.findOne({ key: name });
    if (!conf) return res.status(404).json({ message: `Config "${name}" not found` });
    res.json({ value: conf.value });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// PUT update config value
router.put("/:name/:newVal", async (req, res) => {
  try {
    const { name, newVal } = req.params;
    const conf = await config.findOneAndUpdate(
      { key: name },
      { value: newVal },
      { new: true }
    );
    if (!conf) return res.status(404).json({ message: `Config "${name}" not found` });
    res.json({ message: `Config "${name}" updated!`, updated: conf });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// POST create new config entry
router.post("/:name/:val", async (req, res) => {
  try {
    const { name, val } = req.params;

    const newConfig = new config({ key: name, value: val });
    await newConfig.save();

    res.status(201).json({ message: `Config "${name}" created`, created: newConfig });
  } catch (err) {
    if (err.code === 11000) { // duplicate key error code in MongoDB
      return res.status(400).json({ message: `Config "${name}" already exists` });
    }

    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});



module.exports = router;
