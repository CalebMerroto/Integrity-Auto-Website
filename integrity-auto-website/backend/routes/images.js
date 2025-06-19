// backend/routes/images.js
const express = require("express");
const router = express.Router();
const Image = require('../models/imageSchema');
const { v4: uuidv4 } = require('uuid');

router.get('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    // Try to find by name first
    let img = await Image.findOne({ name });

    // If not found by name, try by uuid
    if (!img) {
      img = await Image.findOne({ uuid: name });
    }

    if (!img) {
      return res.status(404).json({ message: `Image "${name}" not found` });
    }

    res.set('Content-Type', img.mimetype);
    res.set('Content-Length', img.data.length);
    res.send(img.data); // Sends raw image data, which the browser can display
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image fetch failed.', details: err.message });
  }
});



// Image upload route
router.post('/:name/upload',
  express.raw({ type: 'image/*', limit: '5mb' }),
  async (req, res) => {
    try {
      const newImage = new Image({
        uuid: uuidv4(),
        name: req.params.name,
        mimetype: req.headers['content-type'],
        data: Buffer.from(req.body), // <-- important!
      });
      await newImage.save();
      res.status(201).json({ message: 'Image uploaded', uuid: newImage.uuid });
    } catch (err) {
      res.status(500).json({ error: `Upload failed: ${err}` });
    }
  }
);





module.exports = router;
