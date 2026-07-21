import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {

  const navigate = useNavigate();

  // Get logged-in user from Local Storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully!");

    navigate("/login");
  };

  return (
    <div className="container py-5">

      {/* Welcome Section */}
      <h2 className="mb-4">
        Welcome back, {user?.fullName} 👋
      </h2>

      {/* Dashboard Cards */}
      <div className="row">

        <DashboardCard
          title="Create New Trip"
          icon="✈️"
          color="primary"
          onClick={() => navigate("/trip-planner")}
        />

        <DashboardCard
          title="My Trips"
          icon="📋"
          color="success"
          onClick={() => navigate("/trip-history")}
        />

        <DashboardCard
          title="Expense Tracker"
          icon="💰"
          color="warning"
          onClick={() => navigate("/expense-tracker")}
        />

        <DashboardCard
          title="Profile"
          icon="👤"
          color="info"
          onClick={() => navigate("/profile")}
        />

        <DashboardCard
          title="Logout"
          icon="🚪"
          color="danger"
          onClick={handleLogout}
        />

      </div>

      {/* Recent Trips Section */}
      <div className="card shadow mt-4">

        <div className="card-body">

          <h3>Recent Trips</h3>

          <hr />

          <p className="text-muted">
            No trips yet. Start by creating your first trip!
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;