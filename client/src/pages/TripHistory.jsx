import { useEffect, useState } from "react";
import { getTrips, deleteTrip, updateTrip } from "../api/tripApi";

function TripHistory() {
  const [trips, setTrips] = useState([]);

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
    <div className="container py-5">

      <h2 className="text-center mb-4">
        📋 My Trips
      </h2>

      {
        trips.length === 0 ? (

          <div className="alert alert-info text-center">
            No Trips Found
          </div>

        ) : (

          <div className="row">

            {
              trips.map((trip) => (

                <div
                  className="col-md-6 mb-4"
                  key={trip.id}
                >

                  <div className="card shadow h-100">

                    <div className="card-body">

                      <h4>
                        ✈️ {trip.trip_name}
                      </h4>

                      <hr />

                      <p>
                        <strong>📍 From:</strong> {trip.source}
                      </p>

                      <p>
                        <strong>📍 To:</strong> {trip.destination}
                      </p>

                      <p>
                        <strong>📅 Start:</strong>{" "}
                        {new Date(trip.start_date).toLocaleDateString()}
                      </p>

                      <p>
                        <strong>📅 End:</strong>{" "}
                        {new Date(trip.end_date).toLocaleDateString()}
                      </p>

                      <p>
                        <strong>💰 Budget:</strong> ₹{trip.budget}
                      </p>

                      <p>
                        <strong>👥 Travelers:</strong> {trip.travelers}
                      </p>

                      <p>
                        <strong>🚗 Travel Mode:</strong> {trip.travel_mode}
                      </p>

                      <p>
                        <strong>🏖 Trip Type:</strong> {trip.trip_type}
                      </p>

                      <p>
                        <strong>Status:</strong>

                        <span className="badge bg-success ms-2">
                          {trip.status}
                        </span>
                      </p>
                      <hr />

                        <div className="d-flex justify-content-between">

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

              ))
            }


          </div>

        )
      }
     {showEdit && (
        <div className="card mt-4 shadow p-4">

          <h3 className="mb-4">✏️ Edit Trip</h3>

          <form onSubmit={handleUpdate}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Trip Name</label>
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

              <div className="col-md-6 mb-3">
                <label className="form-label">Source</label>
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

              <div className="col-md-6 mb-3">
                <label className="form-label">Destination</label>
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
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={editingTrip.startDate}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={editingTrip.endDate}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Budget</label>
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

              <div className="col-md-6 mb-3">
                <label className="form-label">Travelers</label>
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

              <div className="col-md-6 mb-3">
                <label className="form-label">Travel Mode</label>
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

              <div className="col-md-6 mb-3">
                <label className="form-label">Trip Type</label>
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

            <button
              type="button"
              className="btn btn-secondary me-2"
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

          </form>

        </div>
      )}

    </div>
  );
}

export default TripHistory;