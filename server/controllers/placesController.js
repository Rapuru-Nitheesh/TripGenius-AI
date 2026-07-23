const axios = require("axios");

const getNearbyPlaces = async (req, res) => {
  try {
    const { lat, lon, type } = req.query;

    if (!lat || !lon || !type) {
      return res.status(400).json({
        message: "Latitude, Longitude and Type are required",
      });
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;

    // Select category based on requested type
    let category = "";

    switch (type) {
      case "hotel":
        category = "accommodation.hotel";
        break;

      case "restaurant":
        category = "catering.restaurant";
        break;

      case "tourist":
        category = "tourism.attraction";
        break;

      default:
        return res.status(400).json({
          message: "Invalid place type",
        });
    }

    const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=10&apiKey=${apiKey}`;

    const response = await axios.get(url);

    const places = response.data.features.map((place) => ({
      id: place.properties.place_id,
      name: place.properties.name || "Unknown",
      address: place.properties.formatted || "Address not available",
      distance: place.properties.distance || 0,
      lat: place.properties.lat,
      lon: place.properties.lon,
    }));

    res.json(places);

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch nearby places",
    });
  }
};

module.exports = {
  getNearbyPlaces,
};