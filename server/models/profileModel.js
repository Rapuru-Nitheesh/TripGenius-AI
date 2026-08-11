const pool = require("../config/db");

// ==============================
// Get Profile
// ==============================
const getProfileById = async (id) => {
  const result = await pool.query(
    `SELECT
        id,
        full_name,
        email,
        phone,
        profile_picture,
        created_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// ==============================
// Update Profile
// ==============================
const updateProfile = async (
  id,
  fullName,
  phone,
  profilePicture
) => {

  const result = await pool.query(
    `UPDATE users
     SET
        full_name = $1,
        phone = $2,
        profile_picture = $3
     WHERE id = $4
     RETURNING *`,
    [fullName, phone, profilePicture, id]
  );

  return result.rows[0];
};

// ==============================
// Get User Password
// ==============================
const getPasswordById = async (id) => {

  const result = await pool.query(
    `SELECT password
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];

};

// ==============================
// Update Password
// ==============================
const updatePassword = async (
  id,
  hashedPassword
) => {

  await pool.query(
    `UPDATE users
     SET password = $1
     WHERE id = $2`,
    [hashedPassword, id]
  );

};

module.exports = {
  getProfileById,
  updateProfile,
  getPasswordById,
  updatePassword,
};