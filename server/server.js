const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== DATABASE ===================== */
mongoose
  .connect(process.env.MONGO_URI, {

  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ===================== ROUTES ===================== */
app.get("/", (req, res) => {
  res.send("Blackcoffer Analytics API is running...");
});

// Insights routes (JSON → MongoDB → Dashboard)
app.use("/api/insights", require("./routes/insightRoutes"));

// Auth routes (Login / Register)
app.use("/api/auth", require("./routes/authRoutes"));

/* ===================== SERVER ===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});