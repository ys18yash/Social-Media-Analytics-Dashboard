const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed",
    userId: req.userId
  });
});

module.exports = router;
