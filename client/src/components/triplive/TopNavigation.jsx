import { useNavigate } from "react-router-dom";
import "./TopNavigation.css";

function TopNavigation({
  activePanel,
  setActivePanel
}) {
  const navigate = useNavigate();

  return (
    <div className="card shadow border-0 top-navigation-card">

      <div className="card-body top-navigation-body">

        <div className="top-navigation-layout">

          {/* Left Side Buttons */}

          <div className="top-navigation-buttons">

            <button
              className={`btn ${
                activePanel === "profile"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setActivePanel("profile")}
            >
              👤 Profile
            </button>


            <button
              className={`btn ${
                activePanel === "expense"
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => setActivePanel("expense")}
            >
              💰 Expenses
            </button>


            <button
              className={`btn ${
                activePanel === "hotel"
                  ? "btn-warning"
                  : "btn-outline-warning"
              }`}
              onClick={() => setActivePanel("hotel")}
            >
              🏨 Hotels
            </button>


            <button
              className={`btn ${
                activePanel === "restaurant"
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={() => setActivePanel("restaurant")}
            >
              🍽 Restaurants
            </button>


            <button
              className={`btn ${
                activePanel === "tourist"
                  ? "btn-info text-white"
                  : "btn-outline-info"
              }`}
              onClick={() => setActivePanel("tourist")}
            >
              🏛 Tourist Spots
            </button>

          </div>


          {/* Right Side Close Button */}

          <div className="top-navigation-close">

            <button
              className="btn btn-outline-danger rounded-circle close-trip-btn"
              onClick={() => {

                const confirmClose = window.confirm(
                  "Are you sure you want to end this trip?"
                );

                if (confirmClose) {
                  navigate("/trip-history");
                }

              }}
            >
              ✖
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TopNavigation;