// backend/routes/idRoutes.js
const express = require("express");
const router = express.Router();
const { readID, nextID, buildID } = require("../middleware/idMiddleware");
const ComponentID = require("../models/idSchema");

// Create the next available ID for a component
router.post("/next/:id", readID, nextID, buildID, async (req, res, next) => {
    try {
        const newID = new ComponentID({
            page: req.page,
            path: req.idPath,
        });

        await newID.save();

        res.status(201).send(req.id);
    } catch (err) {
        next(err); // pass error to error-handling middleware
    }
});

// Wipe all stored component IDs (for dev/testing reset)
router.post("/clear", async (req, res, next) => {
    try {
        await ComponentID.deleteMany({});
        res.status(200).json({ message: "All component IDs cleared." });
    } catch (err) {
        next(err);
    }
});

router.post('/create/:id', readID, async (req, res, next) => {
    console.log("page:",req.page)
    console.log("path:", req.idPath)
    console.log("")
    const exists = await ComponentID.exists({
        page: req.page,
        path: req.idPath
    });
    if (exists) {
        res.status(201).send({page: req.page, path: req.path});
    }
    try {
        const newID = new ComponentID({
            page: req.page,
            path: req.idPath,
        });
        await newID.save();
        res.status(201).send({page: req.page, path: req.path});
    } catch (err) {
        next(err)
    }
})
router.get('/exists/:id', readID, async (req, res) => {
    const exists = await ComponentID.exists({
        page: req.page,
        path: req.idPath
    });
    res.json({
        page: req.page,
        path: req.idPath,
        exists: !!exists
    });
});

router.get('/count/:id', readID, async (req, res, next) => {
  const pathLength = req.idPath.length;

  // Query all ComponentIDs where:
  // - page matches
  // - path starts with req.idPath
  const count = await ComponentID.countDocuments({
    page: req.page,
    $expr: {
      $eq: [
        { $slice: ["$path", pathLength] },
        req.idPath
      ]
    }
  });

  res.json({
    page: req.page,
    pathPrefix: req.idPath,
    count
  });
});

module.exports = router;
