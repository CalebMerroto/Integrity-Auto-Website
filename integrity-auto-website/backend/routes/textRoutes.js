// backend/routes/textRoutes.js
const express = require("express");
const router = express.Router();
const mdText = require("../models/mdSchema");


router.post('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { text } = req.body;
    console.log("")
    console.log("")
    console.log("")
    console.log("req.body: ",req.body)
    console.log("")
    console.log("")
    console.log("")


    if (!text) {
        return res.status(400).json({ message: "Text content is required." });
    }

    const updated = await mdText.findOneAndUpdate(
        { uuid },
        { text },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    req.md = updated;
    res.status(200).json({text: updated?.text ?? ""})

})


router.get("/:uuid", async (req,res) => {
    const { uuid } = req.params;
    req.uuid = uuid;

    const doc = await mdText.findOne({ uuid });
    
    res.status(200).json({text: doc?.text ?? ""})
})



module.exports = router