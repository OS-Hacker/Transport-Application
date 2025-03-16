import express from "express";
import { isAdmin, requiredSignIn } from "../middleware/Auth.middleware.js";
import {
  createBookingController,
  deleteBookingController,
  getBookingDataController,
  getCustomerBookings,
  getSingleDataController,
  updateBookingController,
} from "../controller/booking.controller.js";

const bookingRouter = express.Router();

// Create a new booking
bookingRouter.post("/create-booking", requiredSignIn, createBookingController);

// Get Customer Booking
bookingRouter.get("/customer-booking", requiredSignIn, getCustomerBookings);

// Get all bookings
bookingRouter.get(
  "/get-bookings",
  requiredSignIn,
  isAdmin,
  getBookingDataController
);

// Get a single booking by ID
bookingRouter.get(
  "/single-booking/:id",
  requiredSignIn,
  isAdmin,
  getSingleDataController
);

// Update a booking by ID
bookingRouter.put(
  "/update-booking/:id",
  requiredSignIn,
  isAdmin,
  updateBookingController
);

// Delete a booking by ID
bookingRouter.delete(
  "/delete-booking/:id",
  requiredSignIn,
  isAdmin,
  deleteBookingController
);

export default bookingRouter;
