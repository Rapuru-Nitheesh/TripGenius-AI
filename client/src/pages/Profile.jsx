import ProfilePanel from "../components/triplive/ProfilePanel";

function Profile() {
  return (
    <div
      className="container py-5"
      style={{
        maxWidth: "1100px",
      }}
    >
      <div className="text-center mb-4">
        <h2 className="fw-bold">👤 My Profile</h2>

        <p className="text-muted">
          Manage your profile, travel memories and achievements
        </p>
      </div>

      <ProfilePanel fullPage />
    </div>
  );
}

export default Profile;