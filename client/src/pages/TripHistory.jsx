import { useEffect, useState } from "react";
import { getTrips, deleteTrip, updateTrip } from "../api/tripApi";
import { useNavigate } from "react-router-dom";
import "./TripHistory.css";

function TripHistory() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const [showEdit, setShowEdit] = useState(false);

  const [editingTrip, setEditingTrip] = useState({
    id: "",
    tripName: "",
    source: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "",
    travelMode: "",
    tripType: "",
  });

  const fetchTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await getTrips(user.id);

      setTrips(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to Load Trips");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTrip(id);

      alert("Trip Deleted Successfully!");

      fetchTrips();
    } catch (error) {
      console.error(error);

      alert("Failed to Delete Trip");
    }
  };

  const handleEdit = (trip) => {
    setEditingTrip({
      id: trip.id,
      tripName: trip.trip_name,
      source: trip.source,
      destination: trip.destination,
      startDate: trip.start_date.split("T")[0],
      endDate: trip.end_date.split("T")[0],
      budget: trip.budget,
      travelers: trip.travelers,
      travelMode: trip.travel_mode,
      tripType: trip.trip_type,
    });

    setShowEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
  !editingTrip.startDate ||
  !editingTrip.endDate
) {
  alert(
    "Please select both start date and end date."
  );
  return;
}

if (
  new Date(editingTrip.endDate) <
  new Date(editingTrip.startDate)
) {
  alert(
    "End date must be on or after the start date."
  );
  return;
}

    try {
      await updateTrip(editingTrip.id, {
        tripName: editingTrip.tripName,
        source: editingTrip.source,
        destination: editingTrip.destination,
        startDate: editingTrip.startDate,
        endDate: editingTrip.endDate,
        budget: editingTrip.budget,
        travelers: editingTrip.travelers,
        travelMode: editingTrip.travelMode,
        tripType: editingTrip.tripType,
      });

      alert("Trip Updated Successfully!");

      setShowEdit(false);

      fetchTrips();
    } catch (error) {
      console.error(error);

      alert("Failed to Update Trip");
    }
  };

  return (
    <div className="container py-5 trip-history-page">

      {/* =========================================
          TITLE
      ========================================= */}

      <h2 className="text-center mb-4 trip-history-title">
        📋 My Trips
      </h2>


      {/* =========================================
          TRIPS
      ========================================= */}

      {trips.length === 0 ? (

        <div className="alert alert-info text-center trip-empty">
          No Trips Found
        </div>

      ) : (

        <div className="row g-4">

          {trips.map((trip) => (

            <div
              className="col-12 col-lg-6"
              key={trip.id}
            >

              <div className="card shadow h-100 trip-card">

                <div className="card-body">

                  {/* Trip Name */}

                  <h4 className="trip-name">
                    ✈️ {trip.trip_name}
                  </h4>

                  <hr />


                  {/* Trip Details */}

                  <div className="trip-details">

                    <p>
                      <strong>📍 From:</strong>{" "}
                      <span>{trip.source}</span>
                    </p>

                    <p>
                      <strong>📍 To:</strong>{" "}
                      <span>{trip.destination}</span>
                    </p>

                    <p>
                      <strong>📅 Start:</strong>{" "}
                      <span>
                        {new Date(
                          trip.start_date
                        ).toLocaleDateString()}
                      </span>
                    </p>

                    <p>
                      <strong>📅 End:</strong>{" "}
                      <span>
                        {new Date(
                          trip.end_date
                        ).toLocaleDateString()}
                      </span>
                    </p>

                    <p>
                      <strong>💰 Budget:</strong>{" "}
                      <span>₹{trip.budget}</span>
                    </p>

                    <p>
                      <strong>👥 Travelers:</strong>{" "}
                      <span>{trip.travelers}</span>
                    </p>

                    <p>
                      <strong>🚗 Travel Mode:</strong>{" "}
                      <span>{trip.travel_mode}</span>
                    </p>

                    <p>
                      <strong>🏖 Trip Type:</strong>{" "}
                      <span>{trip.trip_type}</span>
                    </p>

                    <p>
                      <strong>Status:</strong>

                      <span className="badge bg-success ms-2">
                        {trip.status}
                      </span>
                    </p>

                  </div>

                  <hr />


                  {/* =========================================
                      ACTION BUTTONS
                  ========================================= */}

                  <div className="trip-actions">

                    <div className="trip-main-actions">

                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate("/trip-planner", {
                            state: {
                              trip,
                              action: "route",
                            },
                          })
                        }
                      >
                        🗺 View Map
                      </button>


                      <button
                        className="btn btn-info text-white"
                        onClick={() =>
                          navigate("/trip-planner", {
                            state: {
                              trip,
                              action: "ai",
                            },
                          })
                        }
                      >
                        🤖 AI Plan
                      </button>


                      <button
                        className="btn btn-success"
                        onClick={() =>
                          navigate("/trip-live", {
                            state: {
                              trip,
                            },
                          })
                        }
                      >
                        ▶ Start Trip
                      </button>

                    </div>


                    <div className="trip-secondary-actions">

                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(trip)}
                      >
                        ✏️ Edit
                      </button>


                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(trip.id)}
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =========================================
          EDIT TRIP
      ========================================= */}

      {showEdit && (

        <div className="card mt-4 shadow p-4 edit-trip-card">

          <h3 className="mb-4 edit-trip-title">
            ✏️ Edit Trip
          </h3>


          <form onSubmit={handleUpdate}>

            <div className="row">

              {/* Trip Name */}

              <div className="col-12 col-md-6 mb-3">

                <label className="form-label">
                  Trip Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={editingTrip.tripName}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      tripName: e.target.value,
                    })
                  }
                />

              </div>


              {/* Source */}

              <div className="col-12 col-md-6 mb-3">

                <label className="form-label">
                  Source
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={editingTrip.source}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      source: e.target.value,
                    })
                  }
                />

              </div>


              {/* Destination */}

              <div className="col-12 col-md-6 mb-3">

                <label className="form-label">
                  Destination
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={editingTrip.destination}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      destination: e.target.value,
                    })
                  }
                />

              </div>

                {/* Start Date */}

                <div className="col-12 col-md-6 mb-3">

                  <label className="form-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={editingTrip.startDate}
                    max={editingTrip.endDate || undefined}
                    onChange={(e) => {

                      const newStartDate = e.target.value;

                      // Check from Start Date side
                      if (
                        editingTrip.endDate &&
                        new Date(newStartDate) >
                          new Date(editingTrip.endDate)
                      ) {

                        alert(
                          "Start date cannot be after the end date."
                        );

                        return;
                      }

                      setEditingTrip({
                        ...editingTrip,
                        startDate: newStartDate,
                      });

                    }}
                  />

                </div>


                {/* End Date */}

                <div className="col-12 col-md-6 mb-3">

                  <label className="form-label">
                    End Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    min={editingTrip.startDate || undefined}
                    value={editingTrip.endDate}
                    onChange={(e) => {

                      const newEndDate = e.target.value;

                      // Check from End Date side
                      if (
                        editingTrip.startDate &&
                        new Date(newEndDate) <
                          new Date(editingTrip.startDate)
                      ) {

                        alert(
                          "End date cannot be before the start date."
                        );

                        return;
                      }

                      setEditingTrip({
                        ...editingTrip,
                        endDate: newEndDate,
                      });

                    }}
                  />

                </div>
              {/* Budget */}

              <div className="col-12 col-md-6 mb-3">

                <label className="form-label">
                  Budget
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={editingTrip.budget}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      budget: e.target.value,
                    })
                  }
                />

              </div>


              {/* Travelers */}

              <div className="col-12 col-md-6 mb-3">

                <label className="form-label">
                  Travelers
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={editingTrip.travelers}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      travelers: e.target.value,
                    })
                  }
                />

              </div>


              {/* Travel Mode */}

              <div className="col-12 col-md-6 mb-3">

                <label className="form-label">
                  Travel Mode
                </label>

                <select
                  className="form-select"
                  value={editingTrip.travelMode}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      travelMode: e.target.value,
                    })
                  }
                >
                  <option>Car</option>
                  <option>Bus</option>
                  <option>Train</option>
                  <option>Flight</option>
                  <option>Bike</option>
                </select>

              </div>


              {/* Trip Type */}

              <div className="col-12 col-md-6 mb-3">

                <label className="form-label">
                  Trip Type
                </label>

                <select
                  className="form-select"
                  value={editingTrip.tripType}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      tripType: e.target.value,
                    })
                  }
                >
                  <option>Friends</option>
                  <option>Family</option>
                  <option>Solo</option>
                  <option>Business</option>
                  <option>Adventure</option>
                </select>

              </div>

            </div>


            {/* Edit Buttons */}

            <div className="edit-buttons">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}

export default TripHistory;