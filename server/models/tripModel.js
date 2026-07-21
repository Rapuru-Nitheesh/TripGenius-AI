const pool = require("../config/db");

// Create a New Trip
const createTrip = async (
  userId,
  tripName,
  source,
  destination,
  startDate,
  endDate,
  budget,
  travelers,
  travelMode,
  tripType
) => {
  const query = `
    INSERT INTO trips
    (
      user_id,
      trip_name,
      source,
      destination,
      start_date,
      end_date,
      budget,
      travelers,
      travel_mode,
      trip_type
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    userId,
    tripName,
    source,
    destination,
    startDate,
    endDate,
    budget,
    travelers,
    travelMode,
    tripType,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};
// Get All Trips of a User
const getTripsByUser = async (userId) => {

  const query = `
    SELECT *
    FROM trips
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};
// Update Trip
const updateTrip = async (
  id,
  tripName,
  source,
  destination,
  startDate,
  endDate,
  budget,
  travelers,
  travelMode,
  tripType
) => {

  const query = `
    UPDATE trips
    SET
      trip_name = $1,
      source = $2,
      destination = $3,
      start_date = $4,
      end_date = $5,
      budget = $6,
      travelers = $7,
      travel_mode = $8,
      trip_type = $9
    WHERE id = $10
    RETURNING *;
  `;

  const values = [
    tripName,
    source,
    destination,
    startDate,
    endDate,
    budget,
    travelers,
    travelMode,
    tripType,
    id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};
// Delete Trip
const deleteTrip = async (id) => {

  const query = `
    DELETE FROM trips
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

module.exports = {
  createTrip,
  getTripsByUser,
  updateTrip,
  deleteTrip,
};