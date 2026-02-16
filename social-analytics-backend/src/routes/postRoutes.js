const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const pool = require("../config/db");

const router = express.Router();

/**
 * Create a post (belongs to logged-in user)
 */
router.post("/", authMiddleware, async (req, res) => {
  const userId = req.userId; // comes from JWT
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const result = await pool.query(
    "INSERT INTO posts (user_id, title) VALUES ($1, $2) RETURNING *",
    [userId, title]
  );

  res.status(201).json(result.rows[0]);
});

/**
 * Get ONLY my posts
 */
router.get("/my-posts", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const result = await pool.query(
    "SELECT * FROM posts WHERE user_id = $1",
    [userId]
  );

  res.json(result.rows);
});

module.exports = router;

