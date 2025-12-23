const redis = require("../config/redis");

const saveRefreshToken = async (userId, token, ttlSeconds) => {
  await redis.set(`refresh:${userId}`, token, "EX", ttlSeconds);
};

const getRefreshToken = async (userId) => {
  return await redis.get(`refresh:${userId}`);
};

const deleteRefreshToken = async (userId) => {
  await redis.del(`refresh:${userId}`);
};

module.exports = { saveRefreshToken, getRefreshToken, deleteRefreshToken };