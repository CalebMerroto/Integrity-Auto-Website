// routes/images.js
import express from 'express';
import Image from '../models/Image.js';
const router = express.Router();

// Parse raw body for binary data
router.use(
  express.raw({
    type: 'image/*',
    limit: '5mb', // optional limit
  })
);

router.post('/:name/upload', async (req, res) => {
  try {
    const { name } = req.params;
    const { locs } = req.body; 
    const usedIn = Array.isArray(locs) ? locs : (locs ? [locs] : []);

    const newImage = new Image({
      uuid: name,
      usedIn,
      mimetype: req.headers['content-type'],
      data: req.body, // raw binary image
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image upload failed.' });
  }
});