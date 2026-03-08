// seedProductBatches.js
const mongoose = require("mongoose");
const ProductBatch = require("../models/ProductBatch"); // adjust path if needed

// Connect to your MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/SmartStockAI")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Your batches data
const batches = [
  { product: new mongoose.Types.ObjectId("6946be435f4a830d09b57380"), batchId: "MRP940-01", quantity: 20, arrivalDate: new Date("2026-03-01T00:00:00Z"), expiryDate: new Date("2026-09-01T00:00:00Z"), warehouse: "Location F:3", season: ["SUMMER"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946be7c5f4a830d09b57382"), batchId: "MRP176-01", quantity: 15, arrivalDate: new Date("2026-03-01T00:00:00Z"), expiryDate: new Date("2026-03-30T00:00:00Z"), warehouse: "Location D:5", season: ["SUMMER"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bea05f4a830d09b57384"), batchId: "MRP985-01", quantity: 10, arrivalDate: new Date("2026-03-01T00:00:00Z"), expiryDate: new Date("2027-03-01T00:00:00Z"), warehouse: "Location T:12", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946beda5f4a830d09b57386"), batchId: "MRP999-01", quantity: 12, arrivalDate: new Date("2026-03-01T00:00:00Z"), expiryDate: new Date("2027-03-01T00:00:00Z"), warehouse: "Location A:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bcca5f4a830d09b5736a"), batchId: "MRP363-01", quantity: 50, arrivalDate: new Date("2026-03-01T00:00:00Z"), expiryDate: new Date("2027-03-01T00:00:00Z"), warehouse: "Location C:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bcef5f4a830d09b5736c"), batchId: "MRP731-01", quantity: 40, arrivalDate: new Date("2026-03-01T00:00:00Z"), expiryDate: new Date("2027-03-01T00:00:00Z"), warehouse: "Location C:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bd095f4a830d09b5736e"), batchId: "MRP901-01", quantity: 30, arrivalDate: new Date("2026-03-01T00:00:00Z"), expiryDate: new Date("2027-03-01T00:00:00Z"), warehouse: "Location B:5", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bd2f5f4a830d09b57370"), batchId: "MRP102-01", quantity: 22, arrivalDate: new Date("2026-03-02T00:00:00Z"), expiryDate: new Date("2027-03-02T00:00:00Z"), warehouse: "Location D:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bd4c5f4a830d09b57372"), batchId: "MRP205-01", quantity: 18, arrivalDate: new Date("2026-03-02T00:00:00Z"), expiryDate: new Date("2026-09-02T00:00:00Z"), warehouse: "Location D:2", season: ["WINTER"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bd695f4a830d09b57374"), batchId: "MRP310-01", quantity: 25, arrivalDate: new Date("2026-03-02T00:00:00Z"), expiryDate: new Date("2027-03-02T00:00:00Z"), warehouse: "Location E:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bd855f4a830d09b57376"), batchId: "MRP420-01", quantity: 28, arrivalDate: new Date("2026-03-02T00:00:00Z"), expiryDate: new Date("2027-03-02T00:00:00Z"), warehouse: "Location E:3", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bda05f4a830d09b57378"), batchId: "MRP530-01", quantity: 32, arrivalDate: new Date("2026-03-03T00:00:00Z"), expiryDate: new Date("2027-03-03T00:00:00Z"), warehouse: "Location F:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bdb75f4a830d09b5737a"), batchId: "MRP640-01", quantity: 16, arrivalDate: new Date("2026-03-03T00:00:00Z"), expiryDate: new Date("2027-03-03T00:00:00Z"), warehouse: "Location F:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bddd5f4a830d09b5737c"), batchId: "MRP750-01", quantity: 21, arrivalDate: new Date("2026-03-03T00:00:00Z"), expiryDate: new Date("2027-03-03T00:00:00Z"), warehouse: "Location G:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bdf35f4a830d09b5737e"), batchId: "MRP860-01", quantity: 14, arrivalDate: new Date("2026-03-03T00:00:00Z"), expiryDate: new Date("2027-03-03T00:00:00Z"), warehouse: "Location G:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946be0b5f4a830d09b57380"), batchId: "MRP970-01", quantity: 26, arrivalDate: new Date("2026-03-04T00:00:00Z"), expiryDate: new Date("2027-03-04T00:00:00Z"), warehouse: "Location H:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946be215f4a830d09b57382"), batchId: "MRP1080-01", quantity: 30, arrivalDate: new Date("2026-03-04T00:00:00Z"), expiryDate: new Date("2027-03-04T00:00:00Z"), warehouse: "Location H:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946be395f4a830d09b57384"), batchId: "MRP1190-01", quantity: 18, arrivalDate: new Date("2026-03-04T00:00:00Z"), expiryDate: new Date("2027-03-04T00:00:00Z"), warehouse: "Location I:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946be515f4a830d09b57386"), batchId: "MRP1300-01", quantity: 24, arrivalDate: new Date("2026-03-04T00:00:00Z"), expiryDate: new Date("2027-03-04T00:00:00Z"), warehouse: "Location I:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946be695f4a830d09b57388"), batchId: "MRP1410-01", quantity: 20, arrivalDate: new Date("2026-03-05T00:00:00Z"), expiryDate: new Date("2027-03-05T00:00:00Z"), warehouse: "Location J:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946be815f4a830d09b5738a"), batchId: "MRP1520-01", quantity: 15, arrivalDate: new Date("2026-03-05T00:00:00Z"), expiryDate: new Date("2027-03-05T00:00:00Z"), warehouse: "Location J:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946be9b5f4a830d09b5738c"), batchId: "MRP1630-01", quantity: 28, arrivalDate: new Date("2026-03-05T00:00:00Z"), expiryDate: new Date("2027-03-05T00:00:00Z"), warehouse: "Location K:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946beb55f4a830d09b5738e"), batchId: "MRP1740-01", quantity: 12, arrivalDate: new Date("2026-03-05T00:00:00Z"), expiryDate: new Date("2027-03-05T00:00:00Z"), warehouse: "Location K:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bed05f4a830d09b57390"), batchId: "MRP1850-01", quantity: 19, arrivalDate: new Date("2026-03-06T00:00:00Z"), expiryDate: new Date("2027-03-06T00:00:00Z"), warehouse: "Location L:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946beeb5f4a830d09b57392"), batchId: "MRP1960-01", quantity: 22, arrivalDate: new Date("2026-03-06T00:00:00Z"), expiryDate: new Date("2027-03-06T00:00:00Z"), warehouse: "Location L:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bf055f4a830d09b57394"), batchId: "MRP2070-01", quantity: 30, arrivalDate: new Date("2026-03-06T00:00:00Z"), expiryDate: new Date("2027-03-06T00:00:00Z"), warehouse: "Location M:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bf1f5f4a830d09b57396"), batchId: "MRP2180-01", quantity: 25, arrivalDate: new Date("2026-03-06T00:00:00Z"), expiryDate: new Date("2027-03-06T00:00:00Z"), warehouse: "Location M:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bf395f4a830d09b57398"), batchId: "MRP2290-01", quantity: 28, arrivalDate: new Date("2026-03-07T00:00:00Z"), expiryDate: new Date("2027-03-07T00:00:00Z"), warehouse: "Location N:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bf535f4a830d09b5739a"), batchId: "MRP2400-01", quantity: 32, arrivalDate: new Date("2026-03-07T00:00:00Z"), expiryDate: new Date("2027-03-07T00:00:00Z"), warehouse: "Location N:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bf6d5f4a830d09b5739c"), batchId: "MRP2510-01", quantity: 15, arrivalDate: new Date("2026-03-07T00:00:00Z"), expiryDate: new Date("2027-03-07T00:00:00Z"), warehouse: "Location O:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bf875f4a830d09b5739e"), batchId: "MRP2620-01", quantity: 20, arrivalDate: new Date("2026-03-07T00:00:00Z"), expiryDate: new Date("2027-03-07T00:00:00Z"), warehouse: "Location O:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bf9f5f4a830d09b573a0"), batchId: "MRP2730-01", quantity: 22, arrivalDate: new Date("2026-03-08T00:00:00Z"), expiryDate: new Date("2027-03-08T00:00:00Z"), warehouse: "Location P:1", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bfb95f4a830d09b573a2"), batchId: "MRP2840-01", quantity: 18, arrivalDate: new Date("2026-03-08T00:00:00Z"), expiryDate: new Date("2027-03-08T00:00:00Z"), warehouse: "Location P:2", season: ["ALL"], status: "IN_STOCK" },
  { product: new mongoose.Types.ObjectId("6946bfd55f4a830d09b573a4"), batchId: "MRP2950-01", quantity: 25, arrivalDate: new Date("2026-03-08T00:00:00Z"), expiryDate: new Date("2027-03-08T00:00:00Z"), warehouse: "Location Q:1", season: ["ALL"], status: "IN_STOCK" }
]

// Insert into MongoDB
ProductBatch.insertMany(batches)
  .then(res => {
    console.log("Inserted batches:", res.length);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error inserting batches:", err);
    mongoose.connection.close();
  });