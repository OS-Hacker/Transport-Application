import mongoose from "mongoose";

// Define the schema
const bookingSchema = new mongoose.Schema({
  Transport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transport", // Reference to the Transport model
    required: true, // Transport is required
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the Transport model
    required: true, // Transport is required
  },
  name: {
    type: String,
    required: true, // Name is required
    trim: true, // Remove extra spaces
  },
  number: {
    type: String,
    required: true, // Mobile number is required
    trim: true,
    match: /^[0-9]{10}$/, // Validate 10-digit mobile number
  },
  vehicle: {
    type: String,
    required: true, // Vehicle is required
    trim: true,
  },
  model: {
    type: String,
    required: true, // Model is required
    trim: true,
  },
  pickup: {
    type: String,
    required: true, // Pickup location is required
    trim: true,
  },
  destination: {
    type: String,
    required: true, // Destination is required
    trim: true,
  },
  date: {
    type: Date,
    required: true, // Date is required
  },
  cost: {
    type: Number,
    required: true, // Cost is required
    min: 0, // Ensure cost is not negative
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"], // Allowed values
    default: "Pending", // Default status
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create the model
export const Booking = mongoose.model("Booking", bookingSchema);
