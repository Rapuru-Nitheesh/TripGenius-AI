const pool = require("../config/db");

// ==============================
// Get Achievements
// ==============================
const getAchievements = async (userId) => {

  const result = await pool.query(
    `SELECT *
     FROM achievements
     WHERE user_id = $1
     ORDER BY achieved_date DESC`,
    [userId]
  );

  return result.rows;

};

// ==============================
// Add Achievement
// ==============================
const addAchievement = async (
  userId,
  title,
  location,
  description,
  achievedDate
) => {

  const result = await pool.query(
    `INSERT INTO achievements
    (user_id, title, location, description, achieved_date)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`,
    [
      userId,
      title,
      location,
      description,
      achievedDate,
    ]
  );

  return result.rows[0];

};

// ==============================
// Update Achievement
// ==============================
const updateAchievement = async (
  id,
  title,
  location,
  description,
  achievedDate
) => {

  const result = await pool.query(
    `UPDATE achievements
     SET
       title = $1,
       location = $2,
       description = $3,
       achieved_date = $4
     WHERE id = $5
     RETURNING *`,
    [
      title,
      location,
      description,
      achievedDate,
      id,
    ]
  );

  return result.rows[0];

};

// ==============================
// Delete Achievement
// ==============================
const deleteAchievement = async (id) => {

  await pool.query(
    `DELETE FROM achievements
     WHERE id = $1`,
    [id]
  );

};

module.exports = {
  getAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement,
};