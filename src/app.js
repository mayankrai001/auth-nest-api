const express = require("express");
const app = express();
const mongoDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./route/auth");
const profileRoutes = require("./route/profile");
const adminRoutes = require("./route/admin");

app.use(
  cors({
    origin: "http://localhost:8080", // Vue app
    credentials: true, // cookies / auth support
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(adminRoutes);
app.use("/auth", authRoutes);
app.use(profileRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/status", (req, res) => {
  res.json({ message: "Backend is working!" });
});

mongoDB.connectDB();

module.exports = app;
