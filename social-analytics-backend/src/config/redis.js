const { Redis } = require("ioredis");
const env = require("./env");

const redisConnection = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("✅ Redis connected");
});

redisConnection.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

module.exports = redisConnection;
