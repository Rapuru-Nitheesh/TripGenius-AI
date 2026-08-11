function TouristPanel({ tourists }) {

  return (
    <>

      {tourists.length === 0 ? (

        <p>No Tourist Places Found</p>

      ) : (

        tourists.slice(0, 5).map((tourist) => (

          <div
            key={tourist.id}
            className="card mb-3 shadow-sm border-0"
          >
            <div className="card-body">

              <h5>🏛 {tourist.name}</h5>

              <p className="text-muted mb-1">
                📍 {tourist.address}
              </p>

              <p>
                📏{" "}
                {tourist.distance < 1000
                  ? `${tourist.distance} m away`
                  : `${(tourist.distance / 1000).toFixed(2)} km away`}
              </p>

            </div>
          </div>

        ))

      )}

    </>
  );

}

export default TouristPanel;