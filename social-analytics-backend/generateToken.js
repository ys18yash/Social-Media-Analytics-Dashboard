const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: 1, email: "test@example.com" },
  "testsecret",
  { expiresIn: "1h" }
);

console.log(token);
