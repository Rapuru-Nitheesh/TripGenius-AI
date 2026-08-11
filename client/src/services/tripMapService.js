import { getCoordinates } from "../api/mapApi";
import { getNearbyPlaces } from "../api/placesApi";
import { getWeather } from "../api/weatherApi";

export const loadTripMap = async (source, destination) => {
  // Get Coordinates
  const src = await getCoordinates(source);
  const dest = await getCoordinates(destination);

  if (src.length === 0 || dest.length === 0) {
    throw new Error("Invalid source or destination");
  }

  const sourceCoords = [
    parseFloat(src[0].lat),
    parseFloat(src[0].lon),
  ];

  const destinationCoords = [
    parseFloat(dest[0].lat),
    parseFloat(dest[0].lon),
  ];

  // Weather
  const weatherData = await getWeather(
    destinationCoords[0],
    destinationCoords[1]
  );

  // Hotels
  const hotels = await getNearbyPlaces(
    destinationCoords[0],
    destinationCoords[1],
    "hotel"
  );

  // Restaurants
  const restaurants = await getNearbyPlaces(
    destinationCoords[0],
    destinationCoords[1],
    "restaurant"
  );

  // Tourist Places
  const tourists = await getNearbyPlaces(
    destinationCoords[0],
    destinationCoords[1],
    "tourist"
  );

  return {
    sourceCoords,
    destinationCoords,
    mapCenter: sourceCoords,
    weather: weatherData.current,
    hotels,
    restaurants,
    tourists,
  };
};