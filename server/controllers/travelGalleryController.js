const galleryModel = require("../models/travelGalleryModel");
const fs = require("fs");
const path = require("path");

// Get Gallery
const getGallery = async(req,res)=>{

    try{

        const {userId}=req.params;

        const gallery=await galleryModel.getGallery(userId);

        res.json({

            success:true,

            gallery

        });

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:"Server Error"

        });

    }

};

// Add Image
const addImage = async (req, res) => {

  try {

    const { userId } = req.body;

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No image selected",
      });

    }

    const imageUrl =
      `http://localhost:5000/uploads/${req.file.filename}`;

    const image = await galleryModel.addImage(
      userId,
      imageUrl
    );

    res.json({
      success: true,
      image,
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
const deleteImage = async (req, res) => {

  try {

    const { id } = req.params;

    // Find image
    const gallery = await galleryModel.getImageById(id);

    if (!gallery) {

      return res.status(404).json({
        success: false,
        message: "Image not found",
      });

    }

    // Delete from uploads folder
    const filename = gallery.image_url.split("/").pop();

    const filePath = path.join(
      __dirname,
      "../uploads",
      filename
    );

    if (fs.existsSync(filePath)) {

      fs.unlinkSync(filePath);

    }

    // Delete from database
    await galleryModel.deleteImage(id);

    res.json({

      success: true,

      message: "Image Deleted"

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

};

module.exports={

    getGallery,

    addImage,

    deleteImage

};