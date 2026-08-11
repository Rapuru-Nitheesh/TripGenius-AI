function HotelPanel({ hotels,setSelectedHotel }) {

  return (

    <>


      {hotels.length === 0 ? (

        <p>No Hotels Found</p>

      ) : (

        hotels.slice(0,5).map((hotel)=>(

          <div
            key={hotel.id}
            className="card mb-3 shadow-sm"
          >

            <div className="card-body">

              <h5>

                {hotel.name}

              </h5>

              <p>

                📍 {hotel.address}

              </p>

              <p>

                {(hotel.distance/1000).toFixed(2)} km

              </p>

            </div>

          </div>

        ))

      )}

    </>

  );

}

export default HotelPanel;