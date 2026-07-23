const express = require("express");
const cors = require("cors");
require("dotenv").config();
const locationRoutes = require("./routes/locationRoutes");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const placesRoutes = require("./routes/placesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/places", placesRoutes);

app.get("/", (req, res) => {
  res.send("🚀 TripGenius AI Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});