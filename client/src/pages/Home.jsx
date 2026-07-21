import hero from "../assets/images/hero.jpg";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="hero-section d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
        }}
      >
        <div className="container text-white">
          <h1 className="display-3 fw-bold">🌍 TripGenius AI</h1>

          <p className="lead fs-3">
            Plan Smarter. Travel Better.
          </p>

          <p className="fs-5">
            AI-powered travel planning with weather,
            maps, budgets and personalized itineraries.
          </p>

          <button className="btn btn-primary btn-lg mt-3 me-3">
            Start Planning
          </button>

          <button className="btn btn-outline-light btn-lg mt-3">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />
    </>
  );
}

export default Home;