import axios from "axios";

const API = "http://localhost:5000/api/explore";

export const searchDestination = async (place, page = 1) => {

    const response = await axios.get(API, {
        params: {
            place,
            page
        }
    });

    return response.data;

};