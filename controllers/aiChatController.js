// controllers/aiChatController.js

const Product = require("../models/Product");
const Order = require("../models/Order");

exports.chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const q = question.toLowerCase();

    // PROJECT DESCRIPTION
    if (
        q.includes("what is this project") ||
        q.includes("about project") ||
        q.includes("what is smartstock")
    ) {
      return res.json({
        message:
            "📦 SmartStock AI is an intelligent inventory management system that helps warehouses track products, monitor stock levels, detect anomalies, and optimize operations using AI-powered analytics and automation."
      });
    }

    // AI FEATURES
    if (
        q.includes("ai feature") ||
        q.includes("what ai") ||
        q.includes("ai capabilities")
    ) {
      return res.json({
        message:
            `🤖 SmartStock AI Features:\n
• Low-stock detection
• Out-of-stock alerts
• Inventory anomaly detection
• Smart alerts system
• Product tracking and monitoring
• Inventory analytics insights`
      });
    }

    // TECHNOLOGIES USED
    if (
        q.includes("technology") ||
        q.includes("tech stack") ||
        q.includes("built with")
    ) {
      return res.json({
        message:
            `⚙️ SmartStock AI Tech Stack:\n
• Frontend: React.js
• Backend: Node.js + Express.js
• Database: MongoDB
• Authentication: JWT
• AI Layer: Intelligent query-based assistant`
      });
    }

    // LOW STOCK
    if (q.includes("low") && q.includes("stock")) {
      const products = await Product.find({
        $expr: { $lt: ["$QTY", "$minStock"] }
      }).select("Title QTY minStock");

      return res.json({
        message: `⚠️ ${products.length} products are low in stock`,
        data: products
      });
    }

    // OUT OF STOCK
    if (q.includes("out of stock") || q.includes("no stock")) {
      const products = await Product.find({ QTY: 0 }).select("Title SKU");

      return res.json({
        message: `❌ ${products.length} products are out of stock`,
        data: products
      });
    }

    // MISPLACED PRODUCTS
    if (q.includes("misplaced")) {
      const products = await Product.find({ misplaced: true }).select(
          "Title SKU location"
      );

      return res.json({
        message: `⚠️ ${products.length} misplaced products found`,
        data: products
      });
    }

    // ACTIVE ALERTS
    if (q.includes("alerts")) {
      const lowStock = await Product.find({
        $expr: { $lt: ["$QTY", "$minStock"] }
      });

      const outOfStock = await Product.find({ QTY: 0 });

      return res.json({
        message: `⚠️ Alerts summary`,
        data: [
          { message: `${lowStock.length} products are low stock` },
          { message: `${outOfStock.length} products are out of stock` }
        ]
      });
    }

    // TOTAL PRODUCTS
    if (q.includes("total") && q.includes("product")) {
      const total = await Product.countDocuments();

      return res.json({
        message: `📦 Total products in inventory: ${total}`
      });
    }

    // TOTAL ORDERS
    if (q.includes("order")) {
      const total = await Order.countDocuments();

      return res.json({
        message: `📑 Total orders: ${total}`
      });
    }

    // DEFAULT RESPONSE
    return res.json({
      message:
          `🤖 I can answer questions about SmartStock AI.\n\nTry asking:\n
• What is this project?\n
• What AI features are available?\n
• What technologies are used?\n
• Show low stock products\n
• Which products are out of stock\n
• Show inventory alerts\n
• Total products\n
• Total orders`
    });

  } catch (error) {
    console.error("AI Chat Error:", error);

    res.status(500).json({
      message: "AI chat error"
    });
  }
};