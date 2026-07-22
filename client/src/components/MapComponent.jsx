import greenMarker from "../assets/icons/marker-green.png";
import redMarker from "../assets/icons/marker-red.png";
import markerShadow from "../assets/icons/marker-shadow.png";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import Routing from "./Routing";
import L from "leaflet";
const sourceIcon = new L.Icon({
  iconUrl: greenMarker,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const destinationIcon = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapComponent({
  center,
  sourceCoords,
  destinationCoords,
  setRouteInfo,
}) {
  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {sourceCoords && (
        <Marker
          position={sourceCoords}
          icon={sourceIcon}
        >
          <Popup>
            📍 Source Location
          </Popup>
        </Marker>
      )}

      {destinationCoords && (
        <Marker
          position={destinationCoords}
          icon={destinationIcon}
        >
          <Popup>
            🎯 Destination
          </Popup>
        </Marker>
      )}

      {sourceCoords && destinationCoords && (
        <Routing
          source={sourceCoords}
          destination={destinationCoords}
          setRouteInfo={setRouteInfo}
        />
      )}
    </MapContainer>
  );
}

export default MapComponent;