import { useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import html2pdf from "html2pdf.js";
import "./AIPlanner.css";

function AIPlanner({
  source,
  destination,
  startDate,
  endDate,
  budget,
  travelers,
  travelMode,
  tripType,
}) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const itineraryRef = useRef(null);

  const days =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(endDate) - new Date(startDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
      : "";

  const generatePlan = async () => {
    if (
      !source ||
      !destination ||
      !startDate ||
      !endDate ||
      !budget ||
      !travelers ||
      !travelMode ||
      !tripType
    ) {
      alert("Please complete the trip details first.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://tripgenius-ai-backend-29n7.onrender.com/api/ai/itinerary",
        {
          source,
          destination,
          startDate,
          endDate,
          days,
          budget,
          travelers,
          travelMode,
          tripType,
        }
      );

      setPlan(res.data.plan);
    } catch (err) {
      console.log(err);
      alert("Failed to generate AI itinerary.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!plan) {
      alert("Generate the itinerary first.");
      return;
    }

    html2pdf()
      .set({
        margin: 10,
        filename: `TripGenius_${destination}.pdf`,
        image: {
          type: "jpeg",
          quality: 1,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(itineraryRef.current)
      .save();
  };

  return (
    <div className="card shadow-lg border-0 mt-4 ai-planner-card">

      <div className="card-body ai-planner-body">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="text-center ai-planner-header">

          <h2 className="ai-planner-title">
            🤖 AI Travel Planner
          </h2>

          <p className="text-muted ai-planner-subtitle">
            Let AI create your personalized travel itinerary
          </p>

        </div>


        {/* =========================================
            TRIP SUMMARY
        ========================================= */}

        <div className="ai-trip-summary">

          <h4 className="text-center fw-bold ai-summary-title">
            🧳 Trip Summary
          </h4>


          {/* Source + Destination */}

          <div className="row g-3">

            <div className="col-12 col-md-6">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body">

                  <small className="text-muted">
                    📍 Source
                  </small>

                  <h5 className="fw-bold mt-2 ai-summary-value">
                    {source}
                  </h5>

                </div>

              </div>

            </div>


            <div className="col-12 col-md-6">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body">

                  <small className="text-muted">
                    🎯 Destination
                  </small>

                  <h5 className="fw-bold mt-2 ai-summary-value">
                    {destination}
                  </h5>

                </div>

              </div>

            </div>

          </div>


          {/* Start + End Date */}

          <div className="row g-3 mt-1">

            <div className="col-12 col-md-6">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body">

                  <small className="text-muted">
                    📅 Start Date
                  </small>

                  <h5 className="fw-bold mt-2 ai-summary-value">
                    {startDate}
                  </h5>

                </div>

              </div>

            </div>


            <div className="col-12 col-md-6">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body">

                  <small className="text-muted">
                    📅 End Date
                  </small>

                  <h5 className="fw-bold mt-2 ai-summary-value">
                    {endDate}
                  </h5>

                </div>

              </div>

            </div>

          </div>


          {/* Budget + Travelers + Duration */}

          <div className="row g-3 mt-1">

            <div className="col-12 col-sm-6 col-lg-4">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body text-center">

                  <div className="ai-summary-icon">
                    💰
                  </div>

                  <small className="text-muted">
                    Budget
                  </small>

                  <h5 className="fw-bold mt-2">
                    ₹ {budget}
                  </h5>

                </div>

              </div>

            </div>


            <div className="col-12 col-sm-6 col-lg-4">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body text-center">

                  <div className="ai-summary-icon">
                    👥
                  </div>

                  <small className="text-muted">
                    Travelers
                  </small>

                  <h5 className="fw-bold mt-2">
                    {travelers}
                  </h5>

                </div>

              </div>

            </div>


            <div className="col-12 col-sm-6 col-lg-4">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body text-center">

                  <div className="ai-summary-icon">
                    🗓
                  </div>

                  <small className="text-muted">
                    Duration
                  </small>

                  <h5 className="fw-bold mt-2">
                    {days} Days
                  </h5>

                </div>

              </div>

            </div>

          </div>


          {/* Travel Mode + Trip Type */}

          <div className="row g-3 mt-1">

            <div className="col-12 col-md-6">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body">

                  <small className="text-muted">
                    🚗 Travel Mode
                  </small>

                  <h5 className="fw-bold mt-2 ai-summary-value">
                    {travelMode}
                  </h5>

                </div>

              </div>

            </div>


            <div className="col-12 col-md-6">

              <div className="card border-0 shadow-sm h-100 ai-summary-card">

                <div className="card-body">

                  <small className="text-muted">
                    🌍 Trip Type
                  </small>

                  <h5 className="fw-bold mt-2 ai-summary-value">
                    {tripType}
                  </h5>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =========================================
            GENERATE BUTTON
        ========================================= */}

        <div className="text-center ai-generate-container">

          <button
            className="btn btn-warning btn-lg ai-generate-btn"
            onClick={generatePlan}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>

                Generating AI Plan...
              </>
            ) : (
              "🤖 Generate AI Itinerary"
            )}

          </button>

        </div>


        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (

          <div className="text-center ai-loading">

            <div className="spinner-border text-warning"></div>

            <h5 className="mt-3">
              TripGenius AI is planning your trip...
            </h5>

            <p className="text-muted">
              Finding attractions, hotels, food and travel tips...
            </p>

          </div>

        )}


        {/* =========================================
            GENERATED ITINERARY
        ========================================= */}

        {plan && (

          <div
            ref={itineraryRef}
            className="card shadow mt-5 ai-itinerary-card"
          >

            <div className="card-body ai-itinerary-body">

              <h3 className="ai-itinerary-title mb-3">
                ✨ Your AI Travel Itinerary
              </h3>


              {/* Badges */}

              <div className="ai-badges mb-3">

                <span className="badge bg-success">
                  AI Generated
                </span>

                <span className="badge bg-primary">
                  Personalized
                </span>

                <span className="badge bg-warning text-dark">
                  Budget Friendly
                </span>

              </div>


              <hr />


              {/* Markdown */}

              <div className="markdown-body ai-markdown">

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {plan}
                </ReactMarkdown>

              </div>


              <hr />


              {/* Buttons */}

              <div className="ai-itinerary-actions">

                <button
                  className="btn btn-primary"
                  onClick={downloadPDF}
                >
                  📄 Download PDF
                </button>


                <button
                  className="btn btn-success"
                  onClick={generatePlan}
                >
                  🔄 Generate Again
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIPlanner;