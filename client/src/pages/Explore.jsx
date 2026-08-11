import { useState } from "react";
import { searchDestination } from "../api/exploreApi";
import "./Explore.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Explore() {
  const [place, setPlace] = useState("");
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!place.trim()) return;

    try {
      setLoading(true);

      const data = await searchDestination(place, 1);

      setImages(data.results);

      setPage(1);

      setHasMore(data.totalPages > 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = await searchDestination(place, nextPage);

      setImages((prev) => [...prev, ...data.results]);

      setPage(nextPage);

      setHasMore(nextPage < data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="explore-container">

      {/* =========================================
          HERO
      ========================================= */}

      <div className="hero">

        <h1>
          🌍 Explore The World
        </h1>

        <p>
          Discover breathtaking destinations with TripGenius AI
        </p>

      </div>


      {/* =========================================
          SEARCH
      ========================================= */}

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search city, country or destination..."
          value={place}
          onChange={(e) => {

            const value = e.target.value;

            setPlace(value);

            if (value.trim() === "") {

              setImages([]);

              setSelectedImage(null);

              setPage(1);

              setHasMore(false);

            }

          }}
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              handleSearch();
            }

          }}
        />

        <button onClick={handleSearch}>
          Search
        </button>

      </div>


      {/* =========================================
          LOADING
      ========================================= */}

      {loading && (

        <div className="loading">

          <div className="spinner"></div>

          <p>
            Searching beautiful destinations...
          </p>

        </div>

      )}


      {/* =========================================
          RESULTS
      ========================================= */}

      {!loading && images.length > 0 && (

        <>

          <h3 className="result-title">

            Explore

            <span>
              {" "}
              {place}
            </span>

          </h3>


          <div className="image-grid">

            {images.map((image) => (

              <div
                className="card"
                key={image.id}
              >

                <img
                  src={image.image}
                  alt={image.description}
                />

                <div className="card-overlay">

                  <p>
                    📸 {image.photographer}
                  </p>

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      setSelectedImage(image);

                    }}
                  >
                    Explore More
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* Load More */}

          {hasMore && (

            <div className="load-more-container">

              <button
                className="load-more-btn"
                onClick={loadMore}
                disabled={loadingMore}
              >

                {loadingMore
                  ? "Loading..."
                  : "Load More Images"}

              </button>

            </div>

          )}

        </>

      )}


      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {!loading && images.length === 0 && (

        <div className="empty-state">

          <h2>
            ✨ Ready for your next adventure?
          </h2>

          <p>
            Search any city, country, or tourist destination
            to discover stunning travel photography.
          </p>

        </div>

      )}


      {/* =========================================
          IMAGE PREVIEW
      ========================================= */}

      {selectedImage && (

        <div
          className="preview-overlay"
          onClick={() => setSelectedImage(null)}
        >

          <div
            className="preview-box"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-preview"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>


            {/* LEFT */}

            <div className="preview-left">

              <img
                src={selectedImage.image}
                alt={selectedImage.description}
              />

            </div>


            {/* RIGHT */}

            <div className="preview-right">

              <h2>
                📍 {place}
              </h2>


              <div className="detail">

                <h4>
                  📸 Photographer
                </h4>

                <p>
                  {selectedImage.photographer}
                </p>

              </div>


              <div className="detail">

                <h4>
                  Description
                </h4>

                <p>
                  {selectedImage.description ||
                    "No description available."}
                </p>

              </div>


              <button
                className="plan-btn"
                onClick={() =>
                  navigate("/trip-planner", {
                    state: {
                      destination: place,
                    },
                  })
                }
              >
                ✈ Plan Trip
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Explore;