import { useEffect, useState, useRef } from "react";

import {
  getGallery,
  uploadImage,
  deleteImage,
} from "../../api/galleryApi";
import "./TravelGallery.css";

function TravelGallery() {
  const [images, setImages] = useState([]);

  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadGallery();
  }, []);

  // Load Gallery
  const loadGallery = async () => {
    try {
      const res = await getGallery(user.id);

      setImages(res.data.gallery);
    } catch (err) {
      console.error(err);
    }
  };

  // Open File Picker
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // Upload Image
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    try {
      const formData = new FormData();

      formData.append("userId", user.id);

      formData.append("image", selectedFile);

      await uploadImage(formData);

      alert("Image Uploaded Successfully!");

      loadGallery();

      // Clear input so same image can be selected again
      e.target.value = "";

    } catch (err) {
      console.error(err);

      alert("Failed to upload image.");
    }
  };

  // Delete Image
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this image?"
    );

    if (!confirmDelete) return;

    try {
      await deleteImage(id);

      alert("Image Deleted Successfully!");

      loadGallery();

    } catch (err) {
      console.error(err);

      alert("Failed to delete image.");
    }
  };

  return (
    <div>

      <h4 className="travel-gallery-title mb-4">
        📷 Travel Gallery
      </h4>

      {/* Hidden File Input */}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Upload Button */}

      <div className="travel-gallery-upload text-center mb-4">

        <button
          className="btn btn-success px-4 py-2"
          onClick={openFilePicker}
        >
          📷 Upload Image
        </button>

      </div>

      {/* Gallery */}

      <div className="row travel-gallery-grid">

        {images.length === 0 ? (

          <div className="text-center">

            <h6 className="text-muted">

              No images uploaded yet.

            </h6>

          </div>

        ) : (

          images.map((img) => (

            <div
              key={img.id}
              className="col-lg-4 col-md-6 mb-4 travel-gallery-column"
            >

              <div className="card shadow-sm border-0">

                <img
                  src={img.image_url}
                  alt="Travel"
                  className="card-img-top travel-gallery-image"
                />

                <div className="card-body text-center">

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(img.id)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default TravelGallery;