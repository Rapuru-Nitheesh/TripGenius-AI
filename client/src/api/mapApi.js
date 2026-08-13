import axios from "axios";

export const getCoordinates = async (place) => {
  const response = await axios.get(
    "http://https://tripgenius-ai-backend-29n7.onrender.com/api/location/search",
    {
      params: {
        q: place,
      },
    }
  );

  return response.data;
};