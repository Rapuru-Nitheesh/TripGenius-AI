function RestaurantPanel({ restaurants }) {

  return (
    <>

      {restaurants.length === 0 ? (

        <p>No Restaurants Found</p>

      ) : (

        restaurants.slice(0, 5).map((restaurant) => (

          <div
            key={restaurant.id}
            className="card mb-3 shadow-sm border-0"
          >
            <div className="card-body">

              <h5>🍽 {restaurant.name}</h5>

              <p className="text-muted mb-1">
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

    </>
  );

}

export default RestaurantPanel;