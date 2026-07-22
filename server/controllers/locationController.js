const axios = require("axios");

const searchLocation = async (req, res) => {
  try {

    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Location is required",
      });
    }

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "TripGeniusAI/1.0",
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Failed to fetch location",
    });

  }
};

module.exports = {
  searchLocation,
};