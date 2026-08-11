import MapComponent from "../MapComponent";
import "./LiveMap.css";

function LiveMap({
  mapCenter,
  sourceCoords,
  destinationCoords,
  setRouteInfo,
  hotels,
  restaurants,
  tourists,
  selectedHotel,
  selectedRestaurant,
  selectedTourist,
}) {
  return (
    <div className="card shadow live-map-card">

      <MapComponent
        center={mapCenter}
        sourceCoords={sourceCoords}
        destinationCoords={destinationCoords}
        setRouteInfo={setRouteInfo}
        hotels={hotels}
        restaurants={restaurants}
        tourists={tourists}
        selectedHotel={selectedHotel}
        selectedRestaurant={selectedRestaurant}
        selectedTourist={selectedTourist}
      />

    </div>
  );
}

export default LiveMap;