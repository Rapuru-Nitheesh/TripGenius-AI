import { useNavigate } from "react-router-dom";
import "./FloatingAIButton.css";

function FloatingAIButton({ trip }) {
  const navigate = useNavigate();

  const handleAIPlanner = () => {
    navigate("/trip-planner", {
      state: {
        trip,
        action: "ai",
      },
    });
  };

  return (
    <button
      className="btn btn-primary shadow floating-ai-button"
      onClick={handleAIPlanner}
    >
      🤖 Plan with TripGenius
    </button>
  );
}

export default FloatingAIButton;