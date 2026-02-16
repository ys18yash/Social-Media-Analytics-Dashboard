const express = require("express");
const metricsQueue = require("../queues/metricsQueue");

const router = express.Router();

router.post("/refresh", async (req, res) => {
  await metricsQueue.add("refresh-analytics", {
    userId: 1,
    platform: "youtube",
  });

  res.json({
    message: "Analytics refresh started",
  });
});

module.exports = router;
