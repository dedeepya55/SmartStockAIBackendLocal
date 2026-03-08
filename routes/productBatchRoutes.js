const express = require("express");
const router = express.Router();
const { getBatches, getBatchById, createBatch } = require("../controllers/ProductBatchController");

// GET all batches with optional filters
router.get("/batches", getBatches);

// GET single batch by batchId
router.get("/batches/:batchId", getBatchById);

// POST create a new batch
router.post("/batches", createBatch);

// 🔹 Optional: Trigger expiry notification manually
router.post("/batches/notify-expiry", async (req, res) => {
    try {
        await notifyExpiringBatches();
        res.json({ success: true, message: "Expiry notifications sent (if any expired batches)." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;