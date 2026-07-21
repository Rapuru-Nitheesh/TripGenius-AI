import { useState } from "react";
import { createTrip } from "../api/tripApi";

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

        </div>

      </div>

    </div>
  );
}

export default TripPlanner;