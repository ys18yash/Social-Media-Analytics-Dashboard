const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const pool = require("../config/db");

/**
 * SIGNUP
 */
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        message: "Email and password required",
      },
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    const user = result.rows[0];

    return res.status(201).json({
      success: true,
      data: {
        userId: user.id,
        email: user.email,
      },
      error: null,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        message: "User already exists",
      },
    });
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        message: "Email and password required",
      },
    });
  }

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({
      success: false,
      data: null,
      error: {
        message: "Invalid credentials",
      },
    });
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      data: null,
      error: {
        message: "Invalid credentials",
      },
    });
  }

  const token = generateToken(user.id);

  return res.json({
    success: true,
    data: {
      token,
      userId: user.id,
      email: user.email,
    },
    error: null,
  });
};
