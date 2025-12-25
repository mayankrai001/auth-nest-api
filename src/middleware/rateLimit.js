const redis = require("../config/redis");

exports.rateLimit = ({ keyPrefix, windowSeconds, maxRequests }) => {
  return async (req, res, next) => {
    try {
      // identify client (IP-based; prod mein userId bhi use kar sakte ho)
      const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
      const key = `${keyPrefix}:${ip}`;

      const current = await redis.incr(key);

      if (current === 1) {
        // first hit -> set expiry
        await redis.expire(key, windowSeconds);
      }

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
