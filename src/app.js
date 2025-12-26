const cors = require("cors");
const express = require("express");
const app = express();
const mongoDB = require("./config/db");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const authRoutes = require("./route/auth");
const profileRoutes = require("./route/profile");
const adminRoutes = require("./route/admin");
// const securityRoutes = require("./route/security");

app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://auth-nest-client-pgkl4qqzh-mayanks-projects-6b476de6.vercel.app", // vercel deployment
      "https://auth-nest-client.vercel.app",
    ], // Vue app
    credentials: true, // cookies / auth support
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  })
);
app.use(express.json());
app.use(cookieParser());

// CSRF protection (cookie-based)
// const csrfProtection = csrf({
//   cookie: {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: process.env.NODE_ENV === "production",
//   },
// });

app.use(adminRoutes);
app.use("/auth", authRoutes);
app.use(profileRoutes);
// app.use(securityRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/status", (req, res) => {
  res.json({ message: "Backend is working!" });
});

mongoDB.connectDB();

module.exports = app;
