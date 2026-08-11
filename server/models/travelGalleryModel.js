const pool = require("../config/db");

// Get all images of a user
const getGallery = async (userId) => {

  const result = await pool.query(
    `SELECT *
     FROM travel_gallery
     WHERE user_id = $1
     ORDER BY uploaded_at DESC`,
    [userId]
  );

  return result.rows;
};

// Add Image
const addImage = async (
  userId,
  imageUrl
) => {

  const result = await pool.query(
    `INSERT INTO travel_gallery
      (user_id,image_url)
     VALUES($1,$2)
     RETURNING *`,
    [userId,imageUrl]
  );

  return result.rows[0];

};

// Delete Image
const deleteImage = async(id)=>{

  await pool.query(

    `DELETE FROM travel_gallery
     WHERE id=$1`,

    [id]

  );

};
const getImageById = async (id) => {

  const result = await pool.query(

    `SELECT *
     FROM travel_gallery
     WHERE id=$1`,

    [id]

  );

  return result.rows[0];

};

module.exports={

  getGallery,

  addImage,

  deleteImage,
  
  getImageById


};