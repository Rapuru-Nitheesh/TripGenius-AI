import ProfilePanel from "./ProfilePanel";
import ExpensePanel from "./ExpensePanel";
import HotelPanel from "./HotelPanel";
import RestaurantPanel from "./RestaurantPanel";
import TouristPanel from "./TouristPanel";

import "./SidePanel.css";


function SidePanel({
  activePanel,
  setActivePanel,

  hotels,
  restaurants,
  tourists,

  setSelectedHotel,
  setSelectedRestaurant,
  setSelectedTourist,

  tripId,
}) {

  if (!activePanel) return null;


  return (

    <div className="card shadow-lg border-0 side-panel">


      {/* Header */}

      <div className="side-panel-header">

        <div className="side-panel-title">

          {activePanel === "profile" &&
            "👤 Profile"}

          {activePanel === "expense" &&
            "💰 Expense Tracker"}

          {activePanel === "hotel" &&
            "🏨 Nearby Hotels"}

          {activePanel === "restaurant" &&
            "🍽 Nearby Restaurants"}

          {activePanel === "tourist" &&
            "🏛 Tourist Places"}

        </div>


        <button
          className="btn btn-outline-danger rounded-circle side-panel-close"
          onClick={() => setActivePanel("")}
        >
          ✖
        </button>

      </div>


      {/* Body */}

      <div className="card-body side-panel-body">


        {activePanel === "profile" && (
          <ProfilePanel />
        )}


        {activePanel === "expense" && (

          <ExpensePanel
            tripId={tripId}
          />

        )}


        {activePanel === "hotel" && (

          <HotelPanel
            hotels={hotels}
            setSelectedHotel={
              setSelectedHotel
            }
          />

        )}


        {activePanel === "restaurant" && (

          <RestaurantPanel
            restaurants={restaurants}
            setSelectedRestaurant={
              setSelectedRestaurant
            }
          />

        )}


        {activePanel === "tourist" && (

          <TouristPanel
            tourists={tourists}
            setSelectedTourist={
              setSelectedTourist
            }
          />

        )}

      </div>

    </div>

  );

}


export default SidePanel;