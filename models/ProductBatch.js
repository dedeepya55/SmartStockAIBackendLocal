const mongoose = require("mongoose");

// ProductBatch Schema
const productBatchSchema = new mongoose.Schema(
    {
        // Link to the product using SKU instead of ObjectId
        productSKU: {
            type: String,
            required: true,
        },

        batchId: {
            type: String,
            required: true,
            unique: true, // unique for each batch
        },

        quantity: {
            type: Number,
            required: true,
        },

        arrivalDate: {
            type: Date,
            default: Date.now,
        },

        expiryDate: {
            type: Date,
            required: false, // optional for non-perishable products
        },

        warehouse: {
            type: String,
            required: true,
        },

        season: {
            type: [String],
            enum: ["SUMMER", "WINTER", "RAINY", "ALL"],
            default: ["ALL"],
            required: true,
        },

        status: {
            type: String,
            enum: ["IN_STOCK", "EXPIRED", "SOLD_OUT", "DAMAGED"],
            default: "IN_STOCK",
        },
    },
    { timestamps: true }
);

// Static method to fetch batch with product info
productBatchSchema.statics.getBatchWithProduct = async function (batchId) {
    const batchWithProduct = await this.aggregate([
        { $match: { batchId } },
        {
            $lookup: {
                from: "products",         // MongoDB collection name for Product
                localField: "productSKU", // field in ProductBatch
                foreignField: "SKU",      // field in Product
                as: "productInfo",        // resulting array
            },
        },
        { $unwind: "$productInfo" }, // convert array to object if only one match
    ]);

    return batchWithProduct[0] || null;
};

module.exports = mongoose.model("ProductBatch", productBatchSchema);