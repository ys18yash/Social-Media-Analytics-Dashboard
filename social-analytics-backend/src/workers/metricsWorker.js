require("dotenv").config();

const { Worker } = require("bullmq");
const redis = require("../config/redis");

let hasFailedOnce = false;

const worker = new Worker(
  "metrics-queue",
  async (job) => {
    const { userId, platform, metricName } = job.data;

    console.log(
      `[WORKER] Job ${job.id} started | user=${userId} platform=${platform}`
    );

    // Simulate one failure (retry test)
    if (!hasFailedOnce) {
      hasFailedOnce = true;
      console.log("[WORKER] Simulating failure");
      throw new Error("Temporary failure");
    }

    // Simulate DB write / aggregation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(
      `[WORKER] DB updated | user=${userId} platform=${platform}`
    );

    // CACHE INVALIDATION (CORE STEP)
    const cacheKey = `daily_metrics:${userId}:${platform}:${metricName}`;
    await redis.del(cacheKey);

    console.log(
      `[WORKER] Cache invalidated | key=${cacheKey}`
    );

    return true;
  },
  { connection: redis }
);

module.exports = worker;



