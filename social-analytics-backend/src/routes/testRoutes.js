const express = require("express");
const metricsQueue = require("../queues/metricsQueue");

const router = express.Router();

router.post("/refresh", async (req, res) => {
  try {
    await metricsQueue.add(
      "refresh-analytics",
      {
        userId: 1,
        platform: "youtube",
        metricName: "followers",
      },
      {
        attempts: 3,
        backoff: {
          type: "fixed",
          delay: 3000,
        },
      }
    );

    return res.json({
      success: true,
      data: {
        message: "Analytics refresh job queued",
      },
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      error: {
        message: "Failed to queue refresh job",
      },
    });
  }
});

module.exports = router;
