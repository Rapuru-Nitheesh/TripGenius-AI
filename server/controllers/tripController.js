const tripModel = require("../models/tripModel");


// ========================================
// CREATE TRIP
// ========================================

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


    // Date validation
    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Start date and end date are required.",
      });
    }


    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        message:
          "End date must be on or after the start date.",
      });
    }


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


// ========================================
// GET USER TRIPS
// ========================================

const getTripsByUser = async (req, res) => {

  try {

    const { userId } = req.params;

    const trips =
      await tripModel.getTripsByUser(userId);


    // Calculate dynamic status
    const today = new Date();

    today.setHours(0, 0, 0, 0);


    const updatedTrips = trips.map((trip) => {

      const startDate =
        new Date(trip.start_date);

      const endDate =
        new Date(trip.end_date);


      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);


      let status;


      if (today < startDate) {

        status = "Upcoming";

      } else if (
        today >= startDate &&
        today <= endDate
      ) {

        status = "Started";

      } else {

        status = "Ended";

      }


      return {
        ...trip,
        status,
      };

    });


    res.status(200).json(updatedTrips);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};


// ========================================
// UPDATE TRIP
// ========================================

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


    // Date validation for EDIT
    if (!startDate || !endDate) {

      return res.status(400).json({
        message:
          "Start date and end date are required.",
      });

    }


    if (new Date(endDate) < new Date(startDate)) {

      return res.status(400).json({
        message:
          "End date must be on or after the start date.",
      });

    }


    const trip =
      await tripModel.updateTrip(
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


    if (!trip) {

      return res.status(404).json({
        message: "Trip not found.",
      });

    }


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


// ========================================
// DELETE TRIP
// ========================================

const deleteTrip = async (req, res) => {

  try {

    const { id } = req.params;

    const trip =
      await tripModel.deleteTrip(id);


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