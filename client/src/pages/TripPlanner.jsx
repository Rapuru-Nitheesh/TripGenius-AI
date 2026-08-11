  import { useState, useEffect } from "react";
  import { createTrip } from "../api/tripApi";
  import MapComponent from "../components/MapComponent";
  import { getCoordinates } from "../api/mapApi";
  import { getWeather } from "../api/weatherApi";
  import { getNearbyPlaces } from "../api/placesApi";
  import AIPlanner from "../components/AIPlanner";
  import { useLocation } from "react-router-dom";
  import { loadTripMap } from "../services/tripMapService";
  import "./TripPlanner.css";
  import Form from "react-bootstrap/Form";

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
    const [activeFeature, setActiveFeature] = useState("");
    const [loadingRoute,setLoadingRoute]=useState(false);
    const [lastSource, setLastSource] = useState("");
    const [lastDestination, setLastDestination] = useState("");   
    const location = useLocation();

    const trip = location.state?.trip;
    const action = location.state?.action; 
    useEffect(() => {

    if (!trip || action !== "ai") return;

    setActiveFeature("ai");

}, [trip, action]);     

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
    if (!startDate || !endDate) {
    alert("Please select both start date and end date.");
    return;
  }

  if (new Date(endDate) < new Date(startDate)) {
    alert("End date must be on or after the start date.");
    return;
  }

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
  useEffect(() => {

  if (!trip) return;

  setTripName(trip.trip_name);
  setSource(trip.source);
  setDestination(trip.destination);
  setStartDate(trip.start_date.split("T")[0]);
  setEndDate(trip.end_date.split("T")[0]);
  setBudget(trip.budget);
  setTravelers(trip.travelers);
  setTravelMode(trip.travel_mode);
  setTripType(trip.trip_type);

}, [trip]);
useEffect(() => {

  if (!action) return;

  if (!source || !destination) return;

  const openFeature = async () => {

    await showLocation();

    setActiveFeature(action);

  };

  openFeature();

}, [source, destination]);
const showLocation = async () => {
  try {

    setLoadingRoute(true);

    const data = await loadTripMap(source, destination);

    setSourceCoords(data.sourceCoords);
    setDestinationCoords(data.destinationCoords);
    setMapCenter(data.mapCenter);

    setWeather(data.weather);

    setHotels(data.hotels);
    setRestaurants(data.restaurants);
    setTourists(data.tourists);

  } catch (err) {

    console.error(err);

    alert("Failed to load route.");

  } finally {

    setLoadingRoute(false);

  }
};
const getWeatherIcon = (code) => {

  if ([0].includes(code)) return "☀️";

  if ([1, 2].includes(code)) return "🌤️";

  if ([3].includes(code)) return "☁️";

  if ([45, 48].includes(code)) return "🌫️";

  if ([51,53,55,61,63,65,80,81,82].includes(code))
    return "🌧️";

  if ([71,73,75,85,86].includes(code))
    return "❄️";

  if ([95,96,99].includes(code))
    return "⛈️";

  return "🌤️";
};
    return (
      <div className="container trip-planner-page py-5">

        <div className="card shadow-lg trip-planner-card">

          <div className="card-body">

            <h2 className="text-center mb-4 trip-planner-title">
              ✈️ Create New Trip
            </h2>

            <form
              onSubmit={handleSubmit}
              className="trip-planner-form"
            >

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

                    {/* Start Date */}

                    <Form.Group className="mb-3">

                      <Form.Label>
                        Start Date
                      </Form.Label>

                      <Form.Control
                        type="date"
                        value={startDate}
                        max={endDate || undefined}
                        onChange={(e) => {

                          const newStartDate = e.target.value;

                          // Check from Start Date side
                          if (
                            endDate &&
                            new Date(newStartDate) >
                              new Date(endDate)
                          ) {

                            alert(
                              "Start date cannot be after the end date."
                            );

                            return;
                          }

                          setStartDate(newStartDate);

                        }}
                      />

                    </Form.Group>


                    {/* End Date */}

                    <Form.Group className="mb-3">

                      <Form.Label>
                        End Date
                      </Form.Label>

                      <Form.Control
                        type="date"
                        min={startDate || undefined}
                        value={endDate}
                        onChange={(e) => {

                          const newEndDate = e.target.value;

                          // Check from End Date side
                          if (
                            startDate &&
                            new Date(newEndDate) <
                              new Date(startDate)
                          ) {

                            alert(
                              "End date cannot be before the start date."
                            );

                            return;
                          }

                          setEndDate(newEndDate);

                        }}
                      />

                    </Form.Group>
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

              <div className="trip-actions">

                <button
                  type="submit"
                  className="btn btn-primary px-4"
                >
                  ✈️ Create Trip
                </button>

                <button
                  type="button"
                  className={`btn ${
                    activeFeature === "route"
                      ? "btn-success"
                      : "btn-outline-success"
                  } px-4`}
                  onClick={async () => {

                    if (!source || !destination) {
                      alert("Please enter Source and Destination");
                      return;
                    }

                    // Load data only once
                    if ( source !== lastSource ||
                          destination !== lastDestination) {
                      await showLocation();
                      setLastSource(source);
                      setLastDestination(destination);
                    }

                    setActiveFeature("route");
                  }}
                >
                  {loadingRoute ? "Loading..." : "🗺 Show Route"}
                </button>

                <button
                  type="button"
                  className={`btn ${
                    activeFeature === "ai"
                      ? "btn-warning"
                      : "btn-outline-warning"
                  } px-4`}
                  onClick={() => setActiveFeature("ai")}
                >
                  🤖 Plan with AI
                </button>

                <button
                  type="button"
                  className={`btn ${
                    activeFeature === "weather"
                      ? "btn-info text-white"
                      : "btn-outline-info"
                  } px-4`}
                  onClick={async () => {

                    if (!source || !destination) {
                      alert("Please enter Source and Destination");
                      return;
                    }

                    // Load data only once
                    if (source !== lastSource ||
                        destination !== lastDestination) {
                      await showLocation();
                      setLastSource(source);
                      setLastDestination(destination);
                    }

                    setActiveFeature("weather");
                  }}
                >
                  🌦️ Weather
                </button>

              </div>

            </form>
            <hr className="my-5" />
                <div className="trip-result-area"></div>
                  {activeFeature === "route" && (
                  <>
                    <div className="card shadow mt-4">
                      <div className="card-body">

                        <h3 className="mb-3">🗺 Travel Route</h3>
                        <div className="trip-map-container"></div>

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

                      </div>
                    </div>

                   <div className="row mt-4">

                      <div className="col-md-6">
                        <div className="card shadow">
                          <div className="card-body text-center">
                            <h5>📏 Distance</h5>
                            <h3>{routeInfo.distance || "--"}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card shadow">
                          <div className="card-body text-center">
                            <h5>⏱ Estimated Time</h5>
                            <h3>{routeInfo.time || "--"}</h3>
                          </div>
                        </div>
                      </div>

                    </div>
                  </>
                )}
                  {activeFeature === "weather" && weather && (

                    <div className="card shadow-lg border-0 mt-4">

                    <div className="card-body">

                    <div className="text-center">

                    <div className="weather-main-icon">

                    {getWeatherIcon(weather.weather_code)}

                    </div>

                    <h1 className="fw-bold weather-value">

                    {weather.temperature_2m}°C

                    </h1>

                    <p className="text-muted">

                    Current Weather at Destination

                    </p>

                    </div>

                    <hr/>

                    <div className="row text-center g-3">

                    <div className="col-12 col-sm-6 col-lg-3">

                    <div className="card shadow-sm h-100">

                    <div className="card-body">

                    <h1>💧</h1>

                    <h6>Humidity</h6>

                    <h5>

                    {weather.relative_humidity_2m}%

                    </h5>

                    </div>

                    </div>

                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">

                    <div className="card shadow-sm h-100">

                    <div className="card-body">

                    <h1>💨</h1>

                    <h6>Wind</h6>

                    <h5>

                    {weather.wind_speed_10m} km/h

                    </h5>

                    </div>

                    </div>

                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">

                    <div className="card shadow-sm h-100">

                    <div className="card-body">

                    <h1>🌡️</h1>

                    <h6>Feels Like</h6>

                    <h5>

                    {weather.apparent_temperature}°C

                    </h5>

                    </div>

                    </div>

                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">

                    <div className="card shadow-sm h-100">

                    <div className="card-body">

                    <h1>🌧️</h1>

                    <h6>Rain</h6>

                    <h5>

                    {weather.precipitation} mm

                    </h5>

                    </div>

                    </div>

                    </div>

                    </div>

                    <hr/>

                    <div className="alert alert-success mt-4">

                    <h5>

                    🧳 Travel Recommendation

                    </h5>

                    <p className="mb-1">

                    {weather.temperature_2m > 35
                    ? "🥵 Very hot. Carry plenty of water and sunscreen."
                    : weather.temperature_2m > 28
                    ? "☀️ Great weather for sightseeing."
                    : weather.temperature_2m > 20
                    ? "🌤 Pleasant weather for outdoor activities."
                    : "🧥 Carry a light jacket."}

                    </p>

                    </div>

                    </div>

                    </div>

                    )} 
                {activeFeature === "ai" && (
                <AIPlanner
                  source={source}
                  destination={destination}
                  startDate={startDate}
                  endDate={endDate}
                  budget={budget}
                  travelers={travelers}
                  travelMode={travelMode}
                  tripType={tripType}
                />
              )}    

            </div>

          </div>

        </div>
    );
  }

  export default TripPlanner;