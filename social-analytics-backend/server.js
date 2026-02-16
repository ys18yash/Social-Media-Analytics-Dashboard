require("dotenv").config();
console.log("1️⃣ dotenv loaded");

const express = require("express");
console.log("2️⃣ express imported");

const env = require("./src/config/env");

// ROUTES
const dashboardRoutes = require("./src/routes/dashboard.routes");
const authRoutes = require("./src/routes/authRoutes");
const protectedRoutes = require("./src/routes/protectedRoutes");
const postRoutes = require("./src/routes/postRoutes");
const refreshRoutes = require("./src/routes/refreshRoutes");
const testRoutes = require("./src/routes/testRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");

const app = express();
console.log("3️⃣ express app created");

// --------------------
// MIDDLEWARE
// --------------------
app.use(express.json());
console.log("4️⃣ json middleware added");

// --------------------
// REQUEST LOGGER
// --------------------
app.use((req, res, next) => {
  console.log(
    `[REQ] ${req.method} ${req.originalUrl} at ${new Date().toISOString()}`
  );
  next();
});

// --------------------
// RESPONSE LOGGER
// --------------------
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[RES] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });

  next();
});

// --------------------
// ROUTES
// --------------------
app.use("/dashboard", dashboardRoutes); // ✅ THIS FIXES YOUR ERROR
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/posts", postRoutes);
app.use("/api", refreshRoutes);
app.use("/test", testRoutes);
app.use("/analytics", analyticsRoutes);

console.log("5️⃣ routes mounted");

// --------------------
// HEALTH CHECK
// --------------------
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// --------------------
// START SERVER
// --------------------
const PORT = env.port || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 ENVIRONMENT: ${env.nodeEnv}`);
});
