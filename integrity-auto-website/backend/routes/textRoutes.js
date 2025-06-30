// backend/routes/textRoutes.js
const express = require("express");
const router = express.Router();
const mdText = require("../models/mdSchema")


router.post('/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params
        const { text } = req.body
        const newText = new mdText({uuid, text})
        await newText.save()

        res.status(201).json({ message: `Text Entry created with id: ${uuid}`, created: newText });
    } catch(err) {
        if (err.code === 11000) { // duplicate key error code in MongoDB
            return res.status(400).json({ message: `"${uuid}" already used` });
        }
        res.status(500).json({ error: "Server error", details: err.message });

    }
})

router.put("/:uuid", async (req,res) => {
    try {
        const { uuid } = req.params
        const { text } = req.body
        const updated = await mdText.findOneAndUpdate(
            { key: uuid },
            { value: text },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: `Text at "${uuid}" not found` });
        res.json({ message: `text at "${uuid}" updated!`, updated: updated });
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
})

router.get("/:uuid", async (req,res) => {
    try {
        const { uuid } = req.params
        const text = await mdText.findOne({ key: uuid });
        if (!text) return res.status(404).json({ message: `Text at "${uuid}" not found` });
        res.json(text);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
})



module.exports = router