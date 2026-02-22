const express = require("express");
const {
  getInsights,
  getInsightStats
} = require("../controllers/insightController");

const router = express.Router();

/**
 * @route   GET /api/insights
 * @desc    Get insights with optional filters
 * @query   country, topic, start_year
 */
router.get("/", getInsights);

/**
 * @route   GET /api/insights/stats
 * @desc    Get aggregated insight statistics for dashboard
 */
router.get("/stats", getInsightStats);

module.exports = router;