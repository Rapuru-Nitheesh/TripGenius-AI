const tripModel = require("../models/tripModel");

const createTrip = async (req, res) => {
  try {

    const {
      userId,
      tripName,
      source,
      destination,
      startDate,
      endDate,
      budget,
      travelers,
      travelMode,
      tripType,
    } = req.body;

    const trip = await tripModel.createTrip(
      userId,
      tripName,
      source,
      destination,
      startDate,
      endDate,
      budget,
      travelers,
      travelMode,
      tripType
    );

    res.status(201).json({
      message: "Trip Created Successfully",
      trip,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }
};
const getTripsByUser = async (req, res) => {

  try {

    const { userId } = req.params;

    const trips = await tripModel.getTripsByUser(userId);

    res.status(200).json(trips);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};
const updateTrip = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      tripName,
      source,
      destination,
      startDate,
      endDate,
      budget,
      travelers,
      travelMode,
      tripType,
    } = req.body;

    const trip = await tripModel.updateTrip(
      id,
      tripName,
      source,
      destination,
      startDate,
      endDate,
      budget,
      travelers,
      travelMode,
      tripType
    );

    res.status(200).json({
      message: "Trip Updated Successfully",
      trip,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};
const deleteTrip = async (req, res) => {

  try {

    const { id } = req.params;

    const trip = await tripModel.deleteTrip(id);

    res.status(200).json({
      message: "Trip Deleted Successfully",
      trip,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};

module.exports = {
  createTrip,
  getTripsByUser,
  updateTrip,
  deleteTrip,
};