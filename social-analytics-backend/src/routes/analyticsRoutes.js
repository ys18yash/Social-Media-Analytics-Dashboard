const express = require("express");
const redis = require("../config/redis");
const pool = require("../config/db");

const router = express.Router();

router.get("/daily", async (req, res) => {
  const userId = 1; // hardcoded for now
  const platform = "youtube";
  const metric = "followers";

  const cacheKey = `daily_metrics:${userId}:${platform}:${metric}`;

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log("CACHE HIT");
      return res.json({
        success: true,
        data: JSON.parse(cachedData),
        error: null,
      });
    }

    console.log("DB HIT");

    const result = await pool.query(
      `SELECT metric_date, metric_value
       FROM daily_metrics
       WHERE user_id = $1
         AND platform = $2
         AND metric_name = $3
       ORDER BY metric_date ASC`,
      [userId, platform, metric]
    );

    await redis.set(cacheKey, JSON.stringify(result.rows), "EX", 60);
    console.log("Data cached in Redis");

    return res.json({
      success: true,
      data: result.rows,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      error: {
        message: "Failed to fetch analytics data",
      },
    });
  }
});

module.exports = router;

