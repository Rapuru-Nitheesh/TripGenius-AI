import axios from "axios";

export const getCoordinates = async (place) => {
  const response = await axios.get(
    "http://localhost:5000/api/location/search",
    {
      params: {
        q: place,
      },
    }
  );

  return response.data;
};