import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadTripMap } from "../services/tripMapService";

import TopNavigation from "../components/triplive/TopNavigation";
import LiveMap from "../components/triplive/LiveMap";
import FloatingAIButton from "../components/triplive/FloatingAIButton";
import SidePanel from "../components/triplive/SidePanel";

import "./TripLive.css";

function TripLive() {
  const [mapCenter, setMapCenter] = useState([20, 78]);

  const [sourceCoords, setSourceCoords] = useState(null);

  const [destinationCoords, setDestinationCoords] = useState(null);

  const [routeInfo, setRouteInfo] = useState({});

  const [hotels, setHotels] = useState([]);

  const [restaurants, setRestaurants] = useState([]);

  const [tourists, setTourists] = useState([]);

  const [activePanel, setActivePanel] = useState("");

  const [selectedHotel, setSelectedHotel] = useState(null);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [selectedTourist, setSelectedTourist] = useState(null);

  const location = useLocation();

  const trip = location.state?.trip;

  const loadLiveTrip = async () => {
    try {
      if (!trip) return;

      const data = await loadTripMap(
        trip.source,
        trip.destination
      );

      setSourceCoords(data.sourceCoords);
      setDestinationCoords(data.destinationCoords);
      setMapCenter(data.mapCenter);

      setHotels(data.hotels);
      setRestaurants(data.restaurants);
      setTourists(data.tourists);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (trip) {
      loadLiveTrip();
    }
  }, [trip]);

  return (
    <div className="container-fluid py-3 triplive-page">

      {/* Top Navigation */}

      <div className="triplive-navigation">
        <TopNavigation
          activePanel={activePanel}
          setActivePanel={setActivePanel}
        />
      </div>


      {/* Main Layout */}

      <div
        className={`row mt-3 triplive-layout ${
          activePanel ? "panel-open" : "panel-closed"
        }`}
      >

        {/* Map */}

        <div
          className={
            activePanel
              ? "col-12 col-lg-8 triplive-map-column"
              : "col-12 triplive-map-column"
          }
        >

          <LiveMap
            mapCenter={mapCenter}
            sourceCoords={sourceCoords}
            destinationCoords={destinationCoords}
            routeInfo={routeInfo}
            setRouteInfo={setRouteInfo}

            hotels={hotels}
            restaurants={restaurants}
            tourists={tourists}

            selectedHotel={selectedHotel}
            selectedRestaurant={selectedRestaurant}
            selectedTourist={selectedTourist}
          />

        </div>


        {/* Side Panel */}

        {activePanel && (

          <div className="col-12 col-lg-4 triplive-side-column">

            <SidePanel
              activePanel={activePanel}
              setActivePanel={setActivePanel}

              hotels={hotels}
              restaurants={restaurants}
              tourists={tourists}

              setSelectedHotel={setSelectedHotel}
              setSelectedRestaurant={setSelectedRestaurant}
              setSelectedTourist={setSelectedTourist}

              tripId={trip?.id}
            />

          </div>

        )}

      </div>


      {/* Floating AI Button */}

      <FloatingAIButton trip={trip} />

    </div>
  );
}

export default TripLive;