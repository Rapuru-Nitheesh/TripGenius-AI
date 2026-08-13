import axios from "axios";

export const getNearbyPlaces = async (lat, lon, type) => {

    const response = await axios.get(
        "http://https://tripgenius-ai-backend-29n7.onrender.com/api/places",
        {
            params: {
                lat,
                lon,
                type
            }
        }
    );

    return response.data;
};