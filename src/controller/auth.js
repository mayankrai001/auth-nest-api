const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { signAccessToken, signRefreshToken } = require("../utils/jwt");
const {
  saveRefreshToken,
  deleteRefreshToken,
  getRefreshToken,
} = require("../service/token");
const { refreshTTL } = require("../helper/ttl");
const cookieOptions = require("../config/cookies");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Signup request body:", req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = { userId: user._id.toString(), role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    await saveRefreshToken(user._id.toString(), refreshToken, refreshTTL);
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions.access)
      .cookie("refreshToken", refreshToken, cookieOptions.refresh)
      .json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    await deleteRefreshToken(decoded.userId);
    return res
      .clearCookie("accessToken", cookieOptions.access)
      .clearCookie("refreshToken", cookieOptions.refresh)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decoded.userId;
    const role = decoded.role;
    const storedToken = await getRefreshToken(userId);

    if (!storedToken || storedToken !== refreshToken) {
      return res.status(401).json({ message: "Refresh token invalid" });
    }
    const payload = { userId, role };

    const newAccessToken = signAccessToken(payload);
    const newRefreshToken = signRefreshToken(payload);

    await saveRefreshToken(userId, newRefreshToken, refreshTTL);

    return res
      .cookie("accessToken", newAccess, cookieOptions.access)
      .cookie("refreshToken", newRefresh, cookieOptions.refresh)
      .json({ message: "Tokens refreshed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
