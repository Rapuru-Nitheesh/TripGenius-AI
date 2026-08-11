import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works-section">

      <div className="container">

        {/* Heading */}

        <div className="text-center how-it-works-heading">

          <h2 className="fw-bold">
            How It Works
          </h2>

        </div>


        {/* Steps */}

        <div className="row text-center g-4">

          {/* Step 1 */}

          <div className="col-12 col-md-4">

            <div className="how-step">

              <div className="how-icon">
                📍
              </div>

              <h4>
                Select Destination
              </h4>

              <p>
                Choose where you want to travel.
              </p>

            </div>

          </div>


          {/* Step 2 */}

          <div className="col-12 col-md-4">

            <div className="how-step">

              <div className="how-icon">
                🤖
              </div>

              <h4>
                AI Creates Plan
              </h4>

              <p>
                Receive an intelligent day-wise itinerary.
              </p>

            </div>

          </div>


          {/* Step 3 */}

          <div className="col-12 col-md-4">

            <div className="how-step">

              <div className="how-icon">
                ✈️
              </div>

              <h4>
                Enjoy Your Trip
              </h4>

              <p>
                Travel with confidence using TripGenius AI.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;