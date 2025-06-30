// backend/routes/configRoutes.js
const config = require('../models/configSchema');
async function findConfig(req, res, next) {
    const { name } = req.params;
    const conf = await config.findOne({ key: name });
    if (!conf) return res.status(404).json({ message: `Config "${name}" not found` });
    req.config = conf
    next()
}
async function setConfig(req, res, next) {
    req.config.value = req.params.newVal
    req.config.save()
    
}

router.get("/:name", findConfig, async (req, res) => {
    res.json({ value: req.config.value });
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

    res.status(500).json({ error: "Server error", details: err.message });
  }
});



module.exports = router;
