import axios from "axios";

export const getWeather = async (lat, lon) => {
  const response = await axios.get(
    "http://localhost:5000/api/weather",
    {
      params: {
        lat,
        lon,
      },
    }
  );

  return response.data;
};