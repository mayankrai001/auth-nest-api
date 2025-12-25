const csrf = require("csurf");

// CSRF protection (cookie-based)
exports.csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});
