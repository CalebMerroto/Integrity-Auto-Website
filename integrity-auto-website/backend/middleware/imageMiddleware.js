// backend/middleware/imageMiddleware.js
const Image = require('../models/imageSchema');
const ImageUsage = require('../models/ImageUsageSchema')


async function getKey(req, res, next) {
    const { keytype, key } = req.params;
    // console.log("keytype:",keytype)
    // console.log("Key:",key)
    if (keytype === "id") {
        req.key = key;
        // console.log("")
        return next();
    } else if (keytype === 'comp') {
        const usage = await ImageUsage.findOne({ locId: key });
        if (!usage) {
            return res.status(404).json({ message: `Image Usage "${key}" not found` });
        }
        req.key = usage.imgId;
        // console.log("")
        return next();
    }
    // console.log("keytype:",keytype)
    // console.log("Key:",key)
    // console.log("")

    return res.status(400).json({ message: `Unsupported keyType "${keytype}"` });
}

async function getImage(req, res, next) {
    req.img = await Image.findOne({ uuid: req.key });

    if (!req.img) {
      return res.status(404).json({ message: `Image "${req.key}" not found` });
    }
    next()
}
async function getImageData(req, res, next) {
  // Find image by uuid, return only selected fields
  req.img = await Image.findOne(
    { uuid: req.key },
    "uuid name uploadedAt mimetype"
  );

  if (!req.img) {
    return res.status(404).json({ message: `Image "${req.key}" not found` });
  }
  next();
}


function validateSorting(req, res, next) {
    const { sortBy = "", order = "" } = req.params;

    const lowerSort = sortBy.toLowerCase();
    if (["date", "time"].includes(lowerSort)) {
        req.sortBy = "uploadedAt";
    } else if (["name", "alpha"].includes(lowerSort)) {
        req.sortBy = "name";
    } else if (["id", "uuid"].includes(lowerSort)) {
        req.sortBy = "uuid";
    } else {
        req.sortBy = "uploadedAt"; // Default fallback
    }

    req.sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

    next();
}
async function getImages(req, res, next) {
    req.imgs = await Image.find({}, "uuid name uploadedAt mimetype")
                          .sort({ [req.sortBy]: req.sortOrder });
    if (!req.imgs || req.imgs.length === 0) {
        return res.status(404).json({ message: `No images found` });
    }
    next();
}


module.exports = { getKey, getImage, validateSorting, getImages, getImageData }