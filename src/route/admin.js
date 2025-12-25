const express = require("express");
const authMiddleware = require("../middleware/auth");
const allowRoles = require("../middleware/role");
const { adminStats } = require("../controller/admin");

const router = express.Router();

router.get("/admin/stats", authMiddleware, allowRoles("admin"), adminStats);

module.exports = router;
