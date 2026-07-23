import greenMarker from "../assets/icons/marker-green.png";
import redMarker from "../assets/icons/marker-red.png";
import markerShadow from "../assets/icons/marker-shadow.png";
import hotelIconImg from "../assets/icons/hotel.png";
import restaurantIconImg from "../assets/icons/restaurant.png";
import touristIconImg from "../assets/icons/tourist.png";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
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
const hotelIcon = new L.Icon({
  iconUrl: hotelIconImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

const restaurantIcon = new L.Icon({
  iconUrl: restaurantIconImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

const touristIcon = new L.Icon({
  iconUrl: touristIconImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 16, {
        animate: true,
      });
    }
  }, [center, map]);

  return null;
}

function MapComponent({
  center,
  sourceCoords,
  destinationCoords,
  setRouteInfo,
  selectedHotel,
  hotels,
  restaurants,
  tourists,
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
      <ChangeView
  center={
    selectedHotel
      ? [selectedHotel.lat, selectedHotel.lon]
      : center
  }
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
      {hotels.slice(0, 5).map((hotel) => (
    <Marker
        key={hotel.id}
        position={[hotel.lat, hotel.lon]}
         icon={hotelIcon}
    >
        <Popup>
            <strong>🏨 {hotel.name}</strong>

            <br />

            {hotel.address}

            <br />

            {(hotel.distance / 1000).toFixed(2)} km away
        </Popup>
    </Marker>
))}
{restaurants &&
  restaurants.slice(0, 5).map((restaurant) => (
    <Marker
      key={restaurant.id}
      position={[restaurant.lat, restaurant.lon]}
       icon={restaurantIcon}
    >
      <Popup>
        <strong>🍽 {restaurant.name}</strong>

        <br />

        {restaurant.address}

        <br />

        {(restaurant.distance / 1000).toFixed(2)} km away
      </Popup>
    </Marker>
))}
{tourists.slice(0, 5).map((tourist) => (
  <Marker
    key={tourist.id}
    position={[tourist.lat, tourist.lon]}
    icon={touristIcon}
  >
    <Popup>
      <strong>🏛 {tourist.name}</strong>
      <br />
      {tourist.address}
    </Popup>
  </Marker>
))}
      {selectedHotel && (
  <Marker
    position={[selectedHotel.lat, selectedHotel.lon]}
  >
    <Popup>
      🏨 {selectedHotel.name}
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