import "./Features.css";
function Features() {

  const features = [
    {
      icon: "🧠",
      title: "AI Trip Planner",
      description:
        "Generate personalized travel itineraries in seconds.",
    },
    {
      icon: "🌤",
      title: "Live Weather",
      description:
        "Get real-time weather forecasts before your journey.",
    },
    {
      icon: "🗺",
      title: "Google Maps",
      description:
        "Explore nearby attractions, hotels and restaurants.",
    },
    {
      icon: "💰",
      title: "Budget Planner",
      description:
        "Manage your travel expenses intelligently.",
    },
  ];

  return (
    <section className="features-section">

      {/* Heading */}

      <div className="text-center mb-5">

        <h2 className="features-title fw-bold">
          Why Choose TripGenius AI?
        </h2>

        <p className="features-subtitle text-muted">
          Everything you need for smart travel planning.
        </p>

      </div>


      {/* Feature Cards */}

      <div className="row g-4">

        {features.map((feature, index) => (

          <div
            className="col-12 col-sm-6 col-lg-3"
            key={index}
          >

            <div className="card feature-card shadow h-100 border-0">

              <div className="card-body text-center d-flex flex-column">

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h4 className="feature-title">
                  {feature.title}
                </h4>

                <p className="feature-description text-muted mb-0">
                  {feature.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;