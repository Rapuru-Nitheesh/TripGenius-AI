const achievementModel = require("../models/achievementModel");

// Get
const getAchievements = async (req, res) => {

  try {

    const { userId } = req.params;

    const achievements =
      await achievementModel.getAchievements(userId);

    res.json({
      success: true,
      achievements,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// Add
const addAchievement = async (req, res) => {

  try {

    const {
      userId,
      title,
      location,
      description,
      achievedDate,
    } = req.body;

    const achievement =
      await achievementModel.addAchievement(
        userId,
        title,
        location,
        description,
        achievedDate
      );

    res.json({
      success: true,
      achievement,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// Update
const updateAchievement = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      location,
      description,
      achievedDate,
    } = req.body;

    const achievement =
      await achievementModel.updateAchievement(
        id,
        title,
        location,
        description,
        achievedDate
      );

    res.json({
      success: true,
      achievement,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// Delete
const deleteAchievement = async (req, res) => {

  try {

    const { id } = req.params;

    await achievementModel.deleteAchievement(id);

    res.json({
      success: true,
      message: "Achievement Deleted",
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
  getAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement,
};