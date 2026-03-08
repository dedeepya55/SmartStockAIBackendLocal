const ProductBatch = require("../models/ProductBatch");
const Product = require("../models/Product");
const User = require("../models/User");

/**
 * Get all batches with optional filters and product info
 */
exports.getBatches = async (req, res) => {
    try {
        const { batchId, productSKU, warehouse, status } = req.query;

        // Build filter dynamically
        const filter = {};

        if (batchId) filter.batchId = batchId;
        if (productSKU) filter.productSKU = productSKU;
        if (warehouse) filter.warehouse = warehouse;
        if (status) filter.status = status;

        // Aggregation to fetch batch with product info
        const batches = await ProductBatch.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "products",         // MongoDB collection name
                    localField: "productSKU", // field in ProductBatch
                    foreignField: "SKU",      // field in Product
                    as: "productInfo",        // resulting array
                },
            },
            { $unwind: "$productInfo" }, // convert array to object if only one match
            { $sort: { arrivalDate: -1 } } // latest batches first
        ]);

        res.status(200).json({
            success: true,
            count: batches.length,
            data: batches,
        });
    } catch (error) {
        console.error("Error fetching batches:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * Get a single batch by batchId with product info
 */
exports.getBatchById = async (req, res) => {
    try {
        const { batchId } = req.params;

        const batch = await ProductBatch.aggregate([
            { $match: { batchId } },
            {
                $lookup: {
                    from: "products",
                    localField: "productSKU",
                    foreignField: "SKU",
                    as: "productInfo",
                },
            },
            { $unwind: "$productInfo" },
        ]);

        if (!batch || batch.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Batch not found",
            });
        }

        res.status(200).json({
            success: true,
            data: batch[0],
        });
    } catch (error) {
        console.error("Error fetching batch:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * Create a new batch
 */
exports.createBatch = async (req, res) => {
    try {
        const { batchId, productSKU, warehouse, quantity, arrivalDate, expiryDate } = req.body;

        if (!batchId || !productSKU) {
            return res.status(400).json({ success: false, message: "batchId and productSKU required" });
        }

        // Fetch product info
        const productInfo = await Product.findOne({ SKU: productSKU });
        if (!productInfo) {
            return res.status(400).json({ success: false, message: "Invalid productSKU" });
        }

        const newBatch = await ProductBatch.create({
            batchId,
            productSKU,
            productInfo, // store the product info object
            warehouse,
            quantity,
            arrivalDate,
            expiryDate: expiryDate || null,
        });

        res.status(201).json({ success: true, data: newBatch });

    } catch (err) {
        console.error("Error creating batch:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

exports.notifyExpiringBatches = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find batches where expiryDate <= today
        const expiringBatches = await ProductBatch.find({
            expiryDate: { $lte: today },
        });

        if (!expiringBatches.length) return;

        // Get users who are staff, admin, or manager
        const users = await User.find({ role: { $in: ["staff", "admin", "manager"] } });

        const notifications = expiringBatches.map(batch => ({
            message: `⚠️ Batch ${batch.batchId} of product ${batch.productSKU} has expired.`,
            type: "EXPIRY",
            createdAt: new Date(),
        }));

        // Push notifications to each user
        for (let user of users) {
            await User.updateOne(
                { _id: user._id },
                { $push: { notifications: { $each: notifications } } }
            );
        }

        console.log(`Sent notifications for ${expiringBatches.length} expired batches.`);
    } catch (err) {
        console.error("Error sending expiry notifications:", err);
    }
};