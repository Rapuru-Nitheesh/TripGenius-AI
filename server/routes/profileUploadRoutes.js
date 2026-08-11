const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pool = require("../config/db");

const router = express.Router();

// ==========================================
// PROFILE UPLOAD FOLDER
// ==========================================

const uploadDirectory = path.join(
  __dirname,
  "../uploads/profiles"
);

// Create folder automatically if it doesn't exist

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}


// ==========================================
// MULTER STORAGE
// ==========================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadDirectory);

  },

  filename: (req, file, cb) => {

    const extension =
      path.extname(file.originalname);

    const fileName =
      `profile-${req.params.userId}-${Date.now()}${extension}`;

    cb(null, fileName);

  },

});


// ==========================================
// FILE VALIDATION
// ==========================================

const upload = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Only image files are allowed"
        )
      );

    }

  },

});


// ==========================================
// UPLOAD PROFILE PICTURE
// ==========================================

router.post(
  "/:userId",
  upload.single("profilePicture"),

  async (req, res) => {

    try {

      const userId = req.params.userId;


      // Check file

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "Please select a profile picture",

        });

      }


      // Create image URL

      const imageUrl =
        `/uploads/profiles/${req.file.filename}`;


      // Save URL in PostgreSQL

      const result = await pool.query(

        `UPDATE users
         SET profile_picture = $1
         WHERE id = $2
         RETURNING id, profile_picture`,

        [
          imageUrl,
          userId,
        ]

      );


      // User not found

      if (result.rows.length === 0) {

        return res.status(404).json({

          success: false,

          message: "User not found",

        });

      }


      // Success

      res.status(200).json({

        success: true,

        message:
          "Profile Picture Uploaded Successfully",

        profilePicture:
          result.rows[0].profile_picture,

      });

    } catch (error) {

      console.error(
        "Profile Upload Error:",
        error
      );


      res.status(500).json({

        success: false,

        message:
          "Failed to upload profile picture",

      });

    }

  }
);


module.exports = router;