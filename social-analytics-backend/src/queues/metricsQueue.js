const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const metricsQueue = new Queue("metrics-queue", {
  connection: redisConnection,
});

module.exports = metricsQueue;

