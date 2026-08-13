import axios from "axios";

const API = "http://https://tripgenius-ai-backend-29n7.onrender.com/api/explore";

export const searchDestination = async (place, page = 1) => {

    const response = await axios.get(API, {
        params: {
            place,
            page
        }
    });

    return response.data;

};