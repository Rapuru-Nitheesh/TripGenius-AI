import { useLocation, useNavigate } from "react-router-dom";
import "./DestinationDetails.css";

function DestinationDetails() {

    const location = useLocation();
    const navigate = useNavigate();

    const image = location.state;

    if (!image) {

        return (

            <div className="not-found">

                <h2>No destination selected.</h2>

            </div>

        );

    }

    return (

        <div className="details-container">

            <img
                src={image.image}
                alt={image.description}
                className="hero-image"
            />

            <div className="details-content">

                <h1>{image.place}</h1>

                <p>

                    {image.description ||
                        `${image.place} is a wonderful travel destination.`}

                </p>

                <p>

                    📸 Photo by <strong>{image.photographer}</strong>

                </p>

                <button
                    onClick={() =>
                        navigate("/trip-planner", {
                            state: {
                                destination: image.place
                            }
                        })
                    }
                >

                    ✈ Plan Trip With AI

                </button>

            </div>

        </div>

    );

}

export default DestinationDetails;