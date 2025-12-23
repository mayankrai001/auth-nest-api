const express = require("express");
const { signup, login, logout, refreshToken } = require("../controller/auth");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh", refreshToken);

module.exports = router;
