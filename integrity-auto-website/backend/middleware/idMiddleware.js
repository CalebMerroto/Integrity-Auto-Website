// backend/middleware/idMiddleware.js
const ComponentID = require("../models/idSchema")

function readID(req, res, next) {
    const parts = req.params.id.split('-'); // assuming id is passed via req.params
    if (!parts || parts.length === 0) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    req.page = parts[0];
    req.idPath = parts.slice(1).map(part => parseInt(part, 10));
    
    if (req.idPath.some(isNaN)) {
        return res.status(400).json({ error: "ID path must contain only numbers" });
    }

    next();
}


async function nextID(req, res, next) {
    const { page, path } = req;

    if (!Array.isArray(path)) {
        return res.status(400).json({ error: "Invalid or missing path" });
    }

    try {
        // Find paths that:
        // 1. Belong to the same page
        // 2. Are one level deeper
        // 3. Match the prefix
        const matches = await ComponentID.find({
            page: page,
            $expr: {
                $and: [
                    { $eq: [{ $size: "$path" }, path.length + 1] },
                    { $eq: [{ $slice: ["$path", 0, path.length] }, path] }
                ]
            }
        });

        // Determine next available index at this depth
        const maxIndex = matches.reduce((max, doc) => {
            const candidate = doc.path[path.length]; // get the extra element
            return candidate > max ? candidate : max;
        }, -1);

        const newPath = [...path, maxIndex + 1];
        req.idPath = newPath;

        next();
    } catch (err) {
        console.error("nextID error:", err);
        res.status(500).json({ error: "Failed to generate next ID", details: err.message });
    }
}

function buildID(req, res, next) {
    if (!req.page || !Array.isArray(req.idPath)) {
        return res.status(400).json({ error: "Missing page or path to build ID" });
    }

    // Format each number in the path as a 3-digit string
    const formattedPath = req.idPath.map(n => n.toString().padStart(3, '0'));

    // Join the page name and the formatted path
    req.id = [req.page, ...formattedPath].join('-');

    next();
}

module.exports = { readID, nextID, buildID };