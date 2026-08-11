import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
} from "../../api/profileApi";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import TravelGallery from "./TravelGallery";
import AchievementPanel from "./AchievementPanel";
import "./ProfilePanel.css";


function ProfilePanel({ fullPage = false }) {

  const [profile, setProfile] = useState(null);

  // Edit Profile Modal
  const [showModal, setShowModal] = useState(false);

  const [fullName, setFullName] = useState("");

  const [phone, setPhone] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  // Selected profile image
  const [profileFile, setProfileFile] = useState(null);

  // Preview image
  const [profilePreview, setProfilePreview] = useState("");


  // Change Password Modal
  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");


  // Default profile image
  const defaultProfileImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";


  useEffect(() => {

    loadProfile();

  }, []);


  // ==============================
  // LOAD PROFILE
  // ==============================

  const loadProfile = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await getProfile(user.id);

      setProfile(res.data.profile);

      setFullName(
        res.data.profile.full_name
      );

      setPhone(
        res.data.profile.phone || ""
      );

      const storedPicture =
      data.profile_picture;

    const imageUrl = storedPicture
      ? storedPicture.startsWith("http")
        ? storedPicture
        : `http://localhost:5000${storedPicture}`
      : defaultProfileImage;

    setProfilePicture(imageUrl);

    setProfilePreview(imageUrl);

    } catch (err) {

      console.error(err);

    }

  };


  // ==============================
  // SELECT PROFILE IMAGE
  // ==============================

  const handleProfileImageChange = async (e) => {

  const file = e.target.files?.[0];

  if (!file) {
    return;
  }


  // Check file type

  if (!file.type.startsWith("image/")) {

    alert(
      "Please select a valid image file."
    );

    return;

  }


  // Check file size

  if (file.size > 5 * 1024 * 1024) {

    alert(
      "Profile picture must be less than 5 MB."
    );

    return;

  }


  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );


    // Show selected image immediately

    const previewUrl =
      URL.createObjectURL(file);

    setProfilePreview(previewUrl);

    setProfileFile(file);


    // Upload to backend

    const res =
      await uploadProfilePicture(
        user.id,
        file
      );


    // Server returns:
    // /uploads/profiles/filename.jpg

    const imageUrl =
      `http://localhost:5000${res.data.profilePicture}`;


    // Save permanent URL in state

    setProfilePicture(imageUrl);

    setProfilePreview(imageUrl);


    alert(
      "Profile Picture Uploaded Successfully"
    );


    // Reload profile from database

    await loadProfile();

  } catch (err) {

    console.error(
      "Profile picture upload error:",
      err
    );


    alert(
      err.response?.data?.message ||
      "Failed to upload profile picture."
    );

  }

};


  // ==============================
  // SAVE PROFILE
  // ==============================

  const saveProfile = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );


      /*
        IMPORTANT:

        Your current backend expects
        profilePicture to be a STRING URL.

        Therefore, selecting a local file alone
        cannot permanently save the image yet.

        We keep the existing URL if no new
        upload backend is available.
      */

      await updateProfile(user.id, {

        fullName,

        phone,

        profilePicture:
          profilePicture,

      });


      alert(
        "Profile Updated Successfully"
      );


      setShowModal(false);

      setProfileFile(null);

      await loadProfile();


    } catch (err) {

      console.error(err);

      alert(
        "Failed to update profile"
      );

    }

  };


  // ==============================
  // CHANGE PASSWORD
  // ==============================

  const savePassword = async () => {

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      alert(
        "Please fill all fields."
      );

      return;

    }


    if (newPassword.length < 8) {

      alert(
        "Password must be at least 8 characters."
      );

      return;

    }


    if (
      newPassword !== confirmPassword
    ) {

      alert(
        "Passwords do not match."
      );

      return;

    }


    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );


      const res = await changePassword(
        user.id,
        {
          currentPassword,
          newPassword,
        }
      );


      alert(res.data.message);


      setShowPasswordModal(false);


      setCurrentPassword("");

      setNewPassword("");

      setConfirmPassword("");


    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed to change password."
      );

    }

  };


  // ==============================
  // LOADING
  // ==============================

  if (!profile) {

    return (
      <h5>
        Loading Profile...
      </h5>
    );

  }


  return (

    <>

      {/* =================================
          PROFILE DETAILS
      ================================= */}

      <div>

        {/* Profile Picture */}

        <div className="text-center mb-4">

          <img
            src={
              profilePreview ||
              profile.profile_picture ||
              defaultProfileImage
            }
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #0d6efd",
            }}
          />

        </div>


        {/* Profile Information */}

        <table className="table">

          <tbody>

            <tr>

              <th>Name</th>

              <td>
                {profile.full_name}
              </td>

            </tr>


            <tr>

              <th>Email</th>

              <td>
                {profile.email}
              </td>

            </tr>


            <tr>

              <th>Phone</th>

              <td>
                {profile.phone || "-"}
              </td>

            </tr>


            <tr>

              <th>Member Since</th>

              <td>

                {new Date(
                  profile.created_at
                ).toLocaleDateString()}

              </td>

            </tr>

          </tbody>

        </table>


        {/* Buttons */}

        <div className="d-grid gap-2">

          <button
            className="btn btn-primary"
            onClick={() =>
              setShowModal(true)
            }
          >
            ✏ Edit Profile
          </button>


          <button
            className="btn btn-warning"
            onClick={() =>
              setShowPasswordModal(true)
            }
          >
            🔒 Change Password
          </button>

        </div>

      </div>


      {/* =================================
          TRAVEL GALLERY
      ================================= */}

      <hr className="my-4" />

      <TravelGallery />


      {/* =================================
          ACHIEVEMENTS
      ================================= */}

      <hr className="my-4" />

      <AchievementPanel />


      {/* =================================
          EDIT PROFILE MODAL
      ================================= */}

      <Modal
        show={showModal}
        onHide={() =>
          setShowModal(false)
        }
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Edit Profile
          </Modal.Title>

        </Modal.Header>


        <Modal.Body>

          <Form>

            {/* Full Name */}

            <Form.Group className="mb-3">

              <Form.Label>
                Full Name
              </Form.Label>

              <Form.Control
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
              />

            </Form.Group>


            {/* Phone */}

            <Form.Group className="mb-3">

              <Form.Label>
                Phone
              </Form.Label>

              <Form.Control
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />

            </Form.Group>


            {/* =================================
                PROFILE IMAGE UPLOAD
            ================================= */}

            <Form.Group className="mb-3">

              <Form.Label>
                Profile Picture
              </Form.Label>


              {/* Hidden File Input */}

              <Form.Control
                id="profilePictureInput"
                type="file"
                accept="image/*"
                onChange={
                  handleProfileImageChange
                }
                style={{
                  display: "none",
                }}
              />


              {/* Upload Button */}

              <label
                htmlFor="profilePictureInput"
                className="btn btn-outline-primary w-100"
                style={{
                  cursor: "pointer",
                }}
              >
                📷 Upload Profile Picture
              </label>


              {/* Selected File Name */}

              {profileFile && (

                <div className="text-center mt-2">

                  <small className="text-muted">

                    Selected:{" "}

                    {profileFile.name}

                  </small>

                </div>

              )}


              {/* Preview */}

              {profilePreview && (

                <div className="text-center mt-3">

                  <img
                    src={profilePreview}
                    alt="Profile Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border:
                        "2px solid #0d6efd",
                    }}
                  />

                </div>

              )}

            </Form.Group>

          </Form>

        </Modal.Body>


        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={() =>
              setShowModal(false)
            }
          >
            Cancel
          </Button>


          <Button
            variant="primary"
            onClick={saveProfile}
          >
            Save Changes
          </Button>

        </Modal.Footer>

      </Modal>


      {/* =================================
          CHANGE PASSWORD MODAL
      ================================= */}

      <Modal
        show={showPasswordModal}
        onHide={() =>
          setShowPasswordModal(false)
        }
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Change Password
          </Modal.Title>

        </Modal.Header>


        <Modal.Body>

          <Form>

            {/* Current Password */}

            <Form.Group className="mb-3">

              <Form.Label>
                Current Password
              </Form.Label>

              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
              />

            </Form.Group>


            {/* New Password */}

            <Form.Group className="mb-3">

              <Form.Label>
                New Password
              </Form.Label>

              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
              />

            </Form.Group>


            {/* Confirm Password */}

            <Form.Group>

              <Form.Label>
                Confirm Password
              </Form.Label>

              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />

            </Form.Group>

          </Form>

        </Modal.Body>


        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={() =>
              setShowPasswordModal(false)
            }
          >
            Cancel
          </Button>


          <Button
            variant="warning"
            onClick={savePassword}
          >
            Change Password
          </Button>

        </Modal.Footer>

      </Modal>

    </>

  );

}

export default ProfilePanel;