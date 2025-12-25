const isProd = process.env.NODE_ENV === "production";

module.exports = {
  access: {
    httpOnly: true,
    secure: isProd, // prod mein true
    sameSite: isProd ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 min
  },
  refresh: {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};
