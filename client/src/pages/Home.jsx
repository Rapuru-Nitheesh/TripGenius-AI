import { useNavigate } from "react-router-dom";
import hero from "../assets/images/hero.jpg";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section
        className="hero-section d-flex align-items-center"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,.55),
              rgba(0,0,0,.55)
            ),
            url(${hero})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 72px)",
          width: "100%",
        }}
      >

        <div className="container">

          <div className="row align-items-center">

            <div className="col-12 col-md-10 col-lg-8">

              {/* Project Name */}

              <h1
                className="fw-bold text-white mb-3"
                style={{
                  fontSize:
                    "clamp(2.3rem, 6vw, 4.5rem)",
                  lineHeight: "1.15",
                }}
              >
                🌍 TripGenius AI
              </h1>


              {/* Tagline */}

              <h3
                className="fw-semibold mb-3"
                style={{
                  fontSize:
                    "clamp(1.25rem, 3vw, 2rem)",

                  background:
                    "linear-gradient(90deg, #00d4ff, #4f8cff, #7c4dff)",

                  WebkitBackgroundClip:
                    "text",

                  WebkitTextFillColor:
                    "transparent",

                  backgroundClip:
                    "text",

                  display:
                    "inline-block",

                  lineHeight: "1.3",
                }}
              >
                Plan Smarter. Travel Better.
              </h3>


              {/* Description */}

              <p
                className="text-light mb-4"
                style={{
                  fontSize:
                    "clamp(0.95rem, 2vw, 1.3rem)",

                  maxWidth: "700px",

                  lineHeight: "1.8",
                }}
              >
                AI-powered travel planning with
                intelligent itineraries, live maps,
                weather updates, nearby hotels,
                restaurants, expense tracking,
                and personalized recommendations.
              </p>


              {/* Buttons */}

              <div className="d-flex flex-column flex-sm-row gap-3">

                <button
                  className="btn btn-primary btn-lg px-4"
                  onClick={() =>
                    navigate("/login")
                  }
                  style={{
                    fontSize:
                      "clamp(0.95rem, 2vw, 1.1rem)",
                  }}
                >
                  🚀 Start Planning
                </button>


                <button
                  className="btn btn-outline-light btn-lg px-4"
                  onClick={scrollToFeatures}
                  style={{
                    fontSize:
                      "clamp(0.95rem, 2vw, 1.1rem)",
                  }}
                >
                  Learn More
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FEATURES
      ========================================= */}

      <section
        id="features"
        className="py-5"
      >
        <Features />
      </section>


      {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <section
        className="py-5 bg-light"
      >
        <HowItWorks />
      </section>

    </>
  );
}

export default Home;