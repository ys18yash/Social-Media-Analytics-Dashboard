const env = require("../config/env");

const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign(
  { userId: userId },
  env.jwtSecret,
  { expiresIn: "1h" }
);

};

/*
expiresIn:
token kitni der valid rahega
*/

module.exports = generateToken;
