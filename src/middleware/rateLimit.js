const redis = require("../config/redis");

exports.rateLimit = ({ keyPrefix, windowSeconds, maxRequests }) => {
  return async (req, res, next) => {
    try {
      // identify client (IP-based; prod mein userId bhi use kar sakte ho)
      const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
      const userPart = req.user?.userId || "guest";
      const key = `${keyPrefix}:${userPart}:${ip}`;

      const current = await redis.incr(key);

      if (current === 1) {
        // first hit -> set expiry
        await redis.expire(key, windowSeconds);
      }
      res.setHeader("X-RateLimit-Limit", maxRequests);
      res.setHeader(
        "X-RateLimit-Remaining",
        Math.max(0, maxRequests - current)
      );

      if (current > maxRequests) {
        return res.status(429).json({
          message: "Too many requests. Please try again later.",
        });
      }

      next();
    } catch (err) {
      // Redis down ho toh app block na ho
      console.error("Rate limit error:", err.message);
      next();
    }
  };
};
