const bcrypt = require("bcrypt");
const profileModel = require("../models/profileModel");

// ==============================
// Get Profile
// ==============================
const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await profileModel.getProfileById(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Update Profile
// ==============================
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      fullName,
      phone,
      profilePicture,
    } = req.body;

    const profile = await profileModel.updateProfile(
      id,
      fullName,
      phone,
      profilePicture
    );

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      profile,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Change Password
// ==============================
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      currentPassword,
      newPassword,
    } = req.body;

    // Get existing password
    const user = await profileModel.getPasswordById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current Password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Save new password
    await profileModel.updatePassword(
      id,
      hashedPassword
    );

    res.json({
      success: true,
      message: "Password Changed Successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};