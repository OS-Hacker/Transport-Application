import mongoose from "mongoose";
import { Booking } from "../models/booking.model.js";

export const createBookingController = async (req, res) => {
  try {
    // Extract booking details from the request body
    const {
      transportId,
      name,
      number,
      vehicle,
      model,
      pickup,
      destination,
      date,
      cost,
    } = req.body;

    // Validate required fields
    if (
      !transportId ||
      !name ||
      !number ||
      !vehicle ||
      !model ||
      !pickup ||
      !destination ||
      !date ||
      !cost
    ) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    // Validate mobile number format (10 digits)
    const mobileNumberRegex = /^[0-9]{10}$/;
    if (!mobileNumberRegex.test(number)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid mobile number. It must be 10 digits.",
      });
    }

    // Validate cost (must be a positive number)
    if (typeof cost !== "number" || cost < 0) {
      return res.status(400).json({
        success: false,
        msg: "Invalid cost. It must be a positive number.",
      });
    }

    // Extract customerId from the authenticated user
    const customerId = req.user._id; // Assuming you're using authentication middleware

    // Create a new booking
    const newBooking = new Booking({
      customerId,
      Transport: transportId, // Include transportId
      name, // Include name
      number,
      vehicle,
      model,
      pickup,
      destination,
      date: new Date(date), // Convert date string to Date object
      cost,
      status: "Pending", // Default status
    });

    // Save the booking to the database
    await newBooking.save();

    // Return success response
    res.status(201).json({
      success: true,
      msg: "Booking successful",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);

    // Handle other errors
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
    });
  }
};

// Get all bookings for a specific customer
export const getCustomerBookings = async (req, res) => {
  try {
    const customerId = req.user._id; // Assuming you're using authentication middleware
   const bookings = await Booking.find({ customerId }).populate("Transport");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching bookings", error });
  }
};

export const getBookingDataController = async (req, res) => {
  try {
    // Fetch all bookings from the database
    // using customer and transport id we get thier data using populate methods
    const bookings = await Booking.find().populate("Transport");
    // Return the bookings
    res.status(200).json({
      success: true,
      msg: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    // Handle errors
    res.status(500).json({
      success: false,
      msg: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

export const getSingleDataController = async (req, res) => {
  try {
    const { id } = req.params; // Get the booking ID from the URL params

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid booking ID",
      });
    }

    // Find the booking by ID
    const booking = await Booking.findById(id).populate("Transport");

    // If booking not found
    if (!booking) {
      return res.status(404).json({
        success: false,
        msg: "Booking not found",
      });
    }

    // Return the booking
    res.status(200).json({
      success: true,
      msg: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);

    // Handle errors
    res.status(500).json({
      success: false,
      msg: "Failed to fetch booking",
      error: error.message,
    });
  }
};

export const updateBookingController = async (req, res) => {
  try {
    const { id } = req.params; // Get the booking ID from the URL params
    const updates = req.body; // Get the updates from the request body

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid booking ID",
      });
    }

    // Find and update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run validators on update
    });

    // If booking not found
    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        msg: "Booking not found",
      });
    }

    // Return the updated booking
    res.status(200).json({
      success: true,
      msg: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);

    // Handle errors
    res.status(500).json({
      success: false,
      msg: "Failed to update booking",
      error: error.message,
    });
  }
};

export const deleteBookingController = async (req, res) => {
  try {
    const { id } = req.params; // Get the booking ID from the URL params

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid booking ID",
      });
    }

    // Find and delete the booking
    const deletedBooking = await Booking.findByIdAndDelete(id);

    // If booking not found
    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        msg: "Booking not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      msg: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);

    // Handle errors
    res.status(500).json({
      success: false,
      msg: "Failed to delete booking",
      error: error.message,
    });
  }
};
