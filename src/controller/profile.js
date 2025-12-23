const user = require("../model/user");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Fetching profile for userId:", userId);
    const userData = await user.findById(userId).select("-password"); // Exclude password
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User fetched successfully", userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
