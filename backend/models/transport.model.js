import mongoose from "mongoose";

const transportSchema = new mongoose.Schema(
  {
    transportName: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary whitespace
    },
    transportNumber: {
      type: Number,
      required: true,
      trim: true, // Removes unnecessary whitespace
    },
    vehicleType: {
      type: Array,
      required: true,
      // enum: ["Bus", "Car", "Bike", "Truck", "Van", "Container"], // Restrict to specific types
    },
    transportImage: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    popular: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    load: {
      type: String,
      required: true, // full load and part load
    },
    ratings: {
      type: Number,
      required: true, // full load and part load
    },
  },
  { timestamps: true }
);

// Create and export the model
export const transportModel = mongoose.model("Transport", transportSchema);
