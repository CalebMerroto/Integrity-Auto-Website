// backend/routes/images.js
const express = require("express");
const router = express.Router();
const Image = require('../models/imageSchema');
const { useImage, getKey, getImage, validateSorting, getImages, getImageData } = require('../middleware/imageMiddleware');
const { readID } = require("../middleware/idMiddleware");
const { v4: uuidv4 } = require("uuid");

router.get('/all/:sortBy/:order', validateSorting, getImages, async (req,res) => {
    res.json(req.imgs)
})
router.get('/meta/:keytype/:key', getKey, getImageData, async (req, res) => {
  res.json({
    name:       req.img.name,
    id:         req.img.uuid,
    storedMimetype:   req.img.mimetype,
    uploaded:   req.img.uploadedAt
  });
});

router.get('/byKey/:keytype/:key', getKey, getImage, async (req, res) => {
    res.set('Content-Type', req.img.mimetype);
    res.set('Content-Length', req.img.data.length);
    res.send(req.img.data);
})
router.delete("/all", async (req, res, next) => {
  // Delete all Image documents
  const imgResult = await Image.deleteMany({});
  
  // Also delete all ImageUsage documents if you want to clean up references
  const usageResult = await ImageUsage.deleteMany({});

  res.json({
    message: "All images and usage records deleted.",
    imagesDeleted: imgResult.deletedCount,
    usagesDeleted: usageResult.deletedCount
  });
});
router.post("/usage/:id/:uuid", async (req, res, next) => {
  const { id, uuid } = req.params;

  // Either update existing or insert new
  const result = await ImageUsage.findOneAndUpdate(
    { locId: id },                         // Query: look for locId match
    { imgId: uuid },                       // Update: set imgId
    { upsert: true, new: true }            // Options: create if not exists, return updated doc
  );

  res.json({
    message: "Usage saved successfully",
    usage: result
  });
});


router.post("/upload/:name/:id",readID,express.raw({ type: "image/*", limit: "5mb" }), async (req, res, next) => {
    const { name, id } = req.params;
    const uuid = uuidv4(); 

    // Check if an image with this UUID already exists
    const existing = await Image.findOne({ uuid: uuid });
    if (existing) {
      return res
        .status(409)
        .json({ message: `Image with generated UUID already exists.` });
    }

    // Create the Image document
    const newImage = new Image({
      uuid: uuid,
      name,
      mimetype: req.headers["content-type"],
      data: Buffer.from(req.body),
    });
    newImage.save()
    req.id = id;
    req.uuid = uuid;
    next();

}, useImage);

module.exports = router;
