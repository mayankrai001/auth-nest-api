const express = require("express");
const { signup, login, logout, refreshToken } = require("../controller/auth");
const { rateLimit } = require("../middleware/rateLimit");

const router = express.Router();

// 5 requests per minute for login
const loginLimiter = rateLimit({
  keyPrefix: "login",
  windowSeconds: 60,
  maxRequests: 5,
});

// 3 requests per minute for signup
const signupLimiter = rateLimit({
  keyPrefix: "signup",
  windowSeconds: 60,
  maxRequests: 3,
});

router.post("/signup", signupLimiter, signup);

router.post("/login", loginLimiter, login);

router.post("/logout", logout);

router.post("/refresh", refreshToken);

module.exports = router;
