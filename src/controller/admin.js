const adminStats = async (req, res) => {
  res.json({ message: "Admin stats access granted" });
};

module.exports = { adminStats };
