const Insight = require("../models/Insight");

/**
 * GET /api/insights
 * Supports filters:
 *  - country
 *  - topic
 *  - start_year
 *
 * Example:
 * /api/insights?country=India&topic=Energy
 */
exports.getInsights = async (req, res) => {
  try {
    const { country, topic, start_year } = req.query;

    // 🔍 Build dynamic filter object
    const filter = {};

    if (country) filter.country = country;
    if (topic) filter.topic = topic;
    if (start_year) filter.start_year = start_year;

    const insights = await Insight.find(filter);

    res.status(200).json(insights);
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({
      message: "Failed to fetch insights",
    });
  }
};

/**
 * GET /api/insights/stats
 * Used for dashboard summary cards
 */
exports.getInsightStats = async (req, res) => {
  try {
    const total = await Insight.countDocuments();

    const byCountry = await Insight.aggregate([
      { $match: { country: { $ne: "" } } },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const byTopic = await Insight.aggregate([
      { $match: { topic: { $ne: "" } } },
      { $group: { _id: "$topic", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      totalInsights: total,
      topCountries: byCountry,
      topTopics: byTopic
    });
  } catch (error) {
    console.error("Error fetching insight stats:", error);
    res.status(500).json({
      message: "Failed to fetch insight statistics",
    });
  }
};