function Features() {

  const features = [
    {
      icon: "🧠",
      title: "AI Trip Planner",
      description: "Generate personalized travel itineraries in seconds."
    },
    {
      icon: "🌤",
      title: "Live Weather",
      description: "Get real-time weather forecasts before your journey."
    },
    {
      icon: "🗺",
      title: "Google Maps",
      description: "Explore nearby attractions, hotels and restaurants."
    },
    {
      icon: "💰",
      title: "Budget Planner",
      description: "Manage your travel expenses intelligently."
    }
  ];

  return (
    <section className="container py-5">

      <div className="text-center mb-5">

        <h2 className="fw-bold">
          Why Choose TripGenius AI?
        </h2>

        <p className="text-muted">
          Everything you need for smart travel planning.
        </p>

      </div>

      <div className="row">

        {features.map((feature, index) => (

          <div className="col-lg-3 col-md-6 mb-4" key={index}>

            <div className="card shadow h-100 border-0">

              <div className="card-body text-center">

                <h1>{feature.icon}</h1>

                <h4>{feature.title}</h4>

                <p className="text-muted">
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