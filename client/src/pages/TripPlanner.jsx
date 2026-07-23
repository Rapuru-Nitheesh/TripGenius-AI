  import { useState, useEffect } from "react";
  import { createTrip } from "../api/tripApi";
  import MapComponent from "../components/MapComponent";
  import { getCoordinates } from "../api/mapApi";
  import { getWeather } from "../api/weatherApi";
  import { getNearbyPlaces } from "../api/placesApi";

  function TripPlanner() {

    const [tripName, setTripName] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");
    const [travelers, setTravelers] = useState("");
    const [travelMode, setTravelMode] = useState("");
    const [tripType, setTripType] = useState("");
    const [mapCenter, setMapCenter] = useState([20, 0]);

    const [sourceCoords, setSourceCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [routeInfo, setRouteInfo] = useState({
    distance: "",
    time: "",
  });
    const [weather, setWeather] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [tourists, setTourists] = useState([]);

    useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Location Error:", error);

          // Default world view if permission denied
          setMapCenter([20, 0]);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setMapCenter([20, 0]);
    }
  }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const response = await createTrip({
        userId: user.id,
        tripName,
        source,
        destination,
        startDate,
        endDate,
        budget,
        travelers,
        travelMode,
        tripType,
      });

      alert(response.data.message);

      console.log(response.data);

      // Clear Form
      setTripName("");
      setSource("");
      setDestination("");
      setStartDate("");
      setEndDate("");
      setBudget("");
      setTravelers("");
      setTravelMode("");
      setTripType("");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to Create Trip"
      );

    }
  };
  const showLocation = async () => {
    try {

      const src = await getCoordinates(source);
      const dest = await getCoordinates(destination);

      if (src.length === 0 || dest.length === 0) {
        alert("Invalid source or destination");
        return;
      }

      const weatherData = await getWeather(
        parseFloat(dest[0].lat),
        parseFloat(dest[0].lon)
      );

      setWeather(weatherData.current);
      const hotelData = await getNearbyPlaces(
      parseFloat(dest[0].lat),
      parseFloat(dest[0].lon),
      "hotel" 
  );
  console.log(hotelData);

  setHotels(hotelData);
  const restaurantData = await getNearbyPlaces(
  parseFloat(dest[0].lat),
  parseFloat(dest[0].lon),
  "restaurant"
);

setRestaurants(restaurantData);
const touristData = await getNearbyPlaces(
  parseFloat(dest[0].lat),
  parseFloat(dest[0].lon),
  "tourist"
);

setTourists(touristData);

      const sourceLocation = [
        parseFloat(src[0].lat),
        parseFloat(src[0].lon),
      ];

      const destinationLocation = [
        parseFloat(dest[0].lat),
        parseFloat(dest[0].lon),
      ];

      setSourceCoords(sourceLocation);
      setDestinationCoords(destinationLocation);
      setMapCenter(sourceLocation);

    } catch (err) {
      console.error(err);
    }
  };
    return (
      <div className="container py-5">

        <div className="card shadow-lg">

          <div className="card-body">

            <h2 className="text-center mb-4">
              ✈️ Create New Trip
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Trip Name */}
              <div className="mb-3">
                <label className="form-label">
                  Trip Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Trip Name"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  required
                />
              </div>

              {/* Source */}
              <div className="mb-3">
                <label className="form-label">
                  Source
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Starting Location"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-success mb-3"
                onClick={showLocation}
              >
                📍 Show Source on Map
              </button>

              {/* Destination */}
              <div className="mb-3">
                <label className="form-label">
                  Destination
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              {/* Dates */}
              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    End Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />

                </div>

              </div>

              {/* Budget & Travelers */}
              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Budget (₹)
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Travelers
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Number of Travelers"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    required
                  />

                </div>

              </div>

              {/* Travel Mode */}
              <div className="mb-3">

                <label className="form-label">
                  Travel Mode
                </label>

                <select
                  className="form-select"
                  value={travelMode}
                  onChange={(e) => setTravelMode(e.target.value)}
                  required
                >
                  <option value="">
                    Select Travel Mode
                  </option>

                  <option>Flight</option>
                  <option>Train</option>
                  <option>Bus</option>
                  <option>Car</option>
                  <option>Bike</option>

                </select>

              </div>

              {/* Trip Type */}
              <div className="mb-4">

                <label className="form-label">
                  Trip Type
                </label>

                <select
                  className="form-select"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  required
                >
                  <option value="">
                    Select Trip Type
                  </option>

                  <option>Adventure</option>
                  <option>Family</option>
                  <option>Friends</option>
                  <option>Solo</option>
                  <option>Business</option>
                  <option>Honeymoon</option>
                  <option>Pilgrimage</option>

                </select>

              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Create Trip
              </button>

            </form>
            <hr className="my-5" />

                <h3 className="mb-3">
                🗺 Travel Map
                </h3>

                <MapComponent
                  center={mapCenter}
                  sourceCoords={sourceCoords}
                  destinationCoords={destinationCoords}
                  setRouteInfo={setRouteInfo}
                  selectedHotel={selectedHotel}
                  hotels={hotels}
                  restaurants={restaurants}
                  tourists={tourists}
                />
                <div className="row mt-4">

                  <div className="col-md-6">
                    <div className="card text-center shadow">
                      <div className="card-body">
                        <h5>📏 Distance</h5>
                        <h3>{routeInfo.distance} KM</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card text-center shadow">
                      <div className="card-body">
                        <h5>⏱ Estimated Time</h5>
                        <h3>{routeInfo.time}</h3>
                      </div>
                    </div>
                  </div>
                  {weather && (
                  <div className="card shadow mt-4">
                    <div className="card-body text-center">

                      <h4>🌦 Destination Weather</h4>

                      <h2>{weather.temperature_2m}°C</h2>

                      <p>
                        💧 Humidity : {weather.relative_humidity_2m}%
                      </p>

                      <p>
                        💨 Wind Speed : {weather.wind_speed_10m} km/h
                      </p>

                    </div>
                  </div>
                )}
                <div className="card shadow mt-4">
                  <div className="card-body">

                    <h4 className="mb-3">🏨 Nearby Hotels</h4>

                    {hotels.length === 0 ? (

                      <p>No hotels found.</p>

                    ) : (

                      hotels.slice(0, 5).map((hotel) => (

                        <div
                          key={hotel.id}
                          className="card mb-3 border-0 shadow-sm"
                        >

                          <div className="card-body">

                            <h5>🏨 {hotel.name}</h5>

                            <p className="text-muted mb-1">
                              📍 {hotel.address}
                            </p>
                            <p>
                              📏{" "}
                              {hotel.distance < 1000
                                ? `${hotel.distance} m away`
                                : `${(hotel.distance / 1000).toFixed(2)} km away`}
                            </p>
                             <button
                      className="btn btn-success btn-sm mt-3"
                      onClick={() => {
                        console.log("Hotel Clicked:", hotel);

                        setSelectedHotel({
                          lat: hotel.lat,
                          lon: hotel.lon,
                          name: hotel.name,
                        });
                      }}
                    >
                      📍 View on Map
                    </button>


                          </div>

                        </div>

                      ))

                    )}
                  </div>
                </div>
                <div className="card shadow mt-4">
  <div className="card-body">

    <h4 className="mb-3">🍽 Nearby Restaurants</h4>

    {restaurants.length === 0 ? (

      <p>No restaurants found.</p>

    ) : (

      restaurants.slice(0,5).map((restaurant) => (

        <div
          key={restaurant.id}
          className="card mb-3 border-0 shadow-sm"
        >

          <div className="card-body">

            <h5>🍽 {restaurant.name}</h5>

            <p className="text-muted">
              📍 {restaurant.address}
            </p>

            <p>
              📏{" "}
              {restaurant.distance < 1000
                ? `${restaurant.distance} m away`
                : `${(restaurant.distance / 1000).toFixed(2)} km away`}
            </p>

          </div>

        </div>

      ))

    )}

  </div>
</div>      

                </div>

          </div>

        </div>

      </div>
    );
  }

  export default TripPlanner;