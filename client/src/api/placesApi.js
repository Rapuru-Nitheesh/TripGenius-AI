import axios from "axios";

export const getNearbyPlaces = async (lat, lon, type) => {

    const response = await axios.get(
        "http://localhost:5000/api/places",
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