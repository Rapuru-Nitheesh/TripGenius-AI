import axios from "axios";

export const getWeather = async (lat, lon) => {
  const response = await axios.get(
    "https://tripgenius-ai-backend-29n7.onrender.com/api/weather",
    {
      params: {
        lat,
        lon,
      },
    }
  );

  return response.data;
};