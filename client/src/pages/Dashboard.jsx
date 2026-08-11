import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import "./Dashboard.css";

import goa from "../assets/images/dashboard/goa.jpg";
import kerala from "../assets/images/dashboard/kerala.jpg";
import ooty from "../assets/images/dashboard/ooty.jpg";
import manali from "../assets/images/dashboard/manali.jpg";
import kashmir from "../assets/images/dashboard/kashmir.jpg";
import jaipur from "../assets/images/dashboard/jaipur.jpg";
import italy from "../assets/images/dashboard/italy.jpg";
import paris from "../assets/images/dashboard/paris.jpg";
import us from "../assets/images/dashboard/us.jpg";
import varanasi from "../assets/images/dashboard/varanasi.jpg";
import greenland from "../assets/images/dashboard/greenland.jpg";
import switzerland from "../assets/images/dashboard/switzerland.jpg";
import rome from "../assets/images/dashboard/rome.jpg";
import germany from "../assets/images/dashboard/germany.jpg";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const images = [
    goa,
    kerala,
    ooty,
    manali,
    kashmir,
    jaipur,
    italy,
    paris,
    us,
    varanasi,
    greenland,
    switzerland,
    rome,
    germany
  ];

  // Random image on every page load
  const backgroundImage = useMemo(() => {
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="overlay">

        <div className="hero-content">

          <h5 className="welcome">
            Welcome Back, {user?.fullName} 👋
          </h5>

          <h1 className="title">
            Discover Your Next Adventure
          </h1>

          <p className="subtitle">
            Plan smarter with AI-powered itineraries,
            live weather updates, maps, hotels,
            restaurants and personalized travel suggestions.
          </p>

          <button
            className="plan-btn"
            onClick={() => navigate("/trip-planner")}
          >
            ✈️ Plan Your Trip
          </button>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;