function DashboardCard({ title, icon, color, onClick }) {
  return (
    <div className="col-md-6 mb-4">
      <div
        className={`card text-white bg-${color} shadow`}
        style={{
          cursor: "pointer",
          transition: "0.3s",
        }}
        onClick={onClick}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.03)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        <div className="card-body text-center">

          <h1>{icon}</h1>

          <h4>{title}</h4>

        </div>
      </div>
    </div>
  );
}

export default DashboardCard;