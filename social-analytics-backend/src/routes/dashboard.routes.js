const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    stats: {
      followers: 12430,
      engagement: 8.1,
      posts: 342,
      reach: 98,
    },
    followersGrowth: [
      { date: "Jan", followers: 8000 },
      { date: "Feb", followers: 8500 },
      { date: "Mar", followers: 9200 },
      { date: "Apr", followers: 10000 },
      { date: "May", followers: 11000 },
      { date: "Jun", followers: 12430 },
    ],
  });
});

module.exports = router;

