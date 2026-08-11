const express = require("express");
const cors = require("cors");
require("dotenv").config();
const locationRoutes = require("./routes/locationRoutes");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const placesRoutes = require("./routes/placesRoutes");
const aiRoutes = require("./routes/aiRoutes");
const exploreRoutes = require("./routes/exploreRoutes");
const profileRoutes = require("./routes/profileRoutes");
const travelGalleryRoutes=require("./routes/travelGalleryRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const path = require("path");
const profileUploadRoutes = require("./routes/profileUploadRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/gallery",travelGalleryRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/achievements", achievementRoutes);
app.use("/api/expenses", expenseRoutes);
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use(
  "/api/profile-upload",
  profileUploadRoutes
);





app.get("/", (req, res) => {
  res.send(" TripGenius AI Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});