const axios = require("axios");

const searchDestination = async (req, res) => {

    try {

        const { place, page = 1 } = req.query;

        const response = await axios.get(
            "https://api.unsplash.com/search/photos",
            {
                params: {
                    query: place,
                    page: page,
                    per_page: 30
                },
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                }
            }
        );

        const images = response.data.results.map(photo => ({

            id: photo.id,

            image: photo.urls.regular,

            thumb: photo.urls.small,

            photographer: photo.user.name,

            description: photo.alt_description || "No description available."

        }));

        res.json({

            results: images,

            totalPages: response.data.total_pages,

            totalResults: response.data.total

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Unable to fetch images"
        });

    }

};

module.exports = {
    searchDestination
};