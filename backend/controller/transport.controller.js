import cloudinary from "../helper/Cloudinary.js";
import { transportModel } from "../models/transport.model.js"; // Assuming you have a transportModel
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; // Import fileURLToPath

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createTransportController = async (req, res) => {
  const {
    transportName,
    transportNumber,
    vehicleType,
    location,
    load,
    popular,
    ratings,
  } = req.body;

  const transportImage = req.file; // Access the uploaded file

  if (!transportImage) {
    return res.status(400).send({ msg: "Transport image is required." });
  }

  // Validate required fields
  if (
    !transportName ||
    !transportNumber ||
    !vehicleType ||
    !location ||
    !load ||
    !popular ||
    !ratings
  ) {
    return res.status(400).send({ msg: "All fields are required" }); // Use 400 for bad requests
  }

  let imageUrl;
  let publicId;
  if (req.file) {
    try {
      // Upload the file to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res.status(500).send({ msg: "Failed to upload image" });
    }
  }

  try {
    // Save transport data to the database
    const transport = await transportModel.create({
      transportName,
      transportNumber,
      vehicleType,
      location,
      load,
      transportImage: imageUrl,
      popular,
      cloudinary_id: publicId,
      ratings,
    });

    return res.status(201).send({
      success: true,
      msg: "Transport created successfully!",
      transport,
    });
  } catch (error) {
    console.error("Error saving transport data:", error);
    return res.status(500).send({ msg: "Failed to create transport" });
  }
};

export const getTransportController = async (req, res) => {
  try {
    const {
      vehicleType,
      load,
      popular,
      ratings,
      location,
      quickResponse,
      page = 1,
      limit = 10,
    } = req.query;

    // Build the filter object
    const filter = {};

    if (vehicleType) {
      filter.vehicleType = { $in: vehicleType.split(",") };
    }

    if (load) {
      filter.load = load;
    }

    if (popular) {
      filter.popular = popular === "true";
    }

    if (ratings) {
      filter.ratings = { $gte: parseFloat(ratings) };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (quickResponse) {
      filter.popular = popular === "true"; // we have not quickResponse
    }

    // Pagination logic
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch filtered transports with pagination
    const transports = await transportModel
      .find(filter)
      .skip(skip)
      .limit(limitNumber)
      .sort({ ratings: -1 }); // Default sorting by ratings (descending)

    // Get the total count of documents
    const totalTransports = await transportModel.countDocuments(filter);

    res.status(200).send({
      success: true,
      msg: "Transports fetched successfully",
      transports,
      pagination: {
        totalTransports,
        totalPages: Math.ceil(totalTransports / limitNumber),
        currentPage: pageNumber,
        transportsPerPage: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error in fetching transports:", error);
    res.status(500).send({
      success: false,
      msg: "Error in fetching transports",
      error: error.message,
    });
  }
};

export const getSingleTransportController = async (req, res) => {
  const { id } = req.params; // Get the transport ID from the URL params

  try {
    // Find the transport record by ID
    const transport = await transportModel.findById(id);

    // If transport is not found, return a 404 error
    if (!transport) {
      return res.status(404).send({
        success: false,
        msg: "Transport not found",
      });
    }

    // Return the transport data
    return res.status(200).send({
      success: true,
      msg: "Transport fetched successfully!",
      transport,
    });
  } catch (error) {
    console.error("Error fetching transport:", error);

    // Handle other server errors
    return res.status(500).send({
      success: false,
      msg: "Failed to fetch transport",
    });
  }
};

export const updateTransportController = async (req, res) => {
  const { id } = req.params; // Get the transport ID from the URL params
  const {
    transportName,
    transportNumber,
    vehicleType,
    location,
    load,
    popular,
    ratings,
  } = req.body;

  const transportImage = req.file; // Access the uploaded file (if any)

  try {
    // Find the existing transport record
    const transport = await transportModel.findById(id);
    if (!transport) {
      return res.status(404).send({ msg: "Transport not found" });
    }

    let imageUrl = transport.transportImage;
    let publicId = transport.cloudinary_id;

    // If a new image is uploaded, update the image in Cloudinary and local storage
    if (transportImage) {
      // Delete the old image from Cloudinary
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        transportImage.path
      );
      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // Update the transport record in the database
    const updatedTransport = await transportModel.findByIdAndUpdate(
      id,
      {
        transportName,
        transportNumber,
        vehicleType,
        location,
        load,
        popular,
        ratings,
        transportImage: imageUrl,
        cloudinary_id: publicId,
      },
      { new: true } // Return the updated document
    );

    return res.status(200).send({
      success: true,
      msg: "Transport updated successfully!",
      transport: updatedTransport,
    });
  } catch (error) {
    console.error("Error updating transport:", error);
    return res.status(500).send({ msg: "Failed to update transport" });
  }
};

export const deleteTransportController = async (req, res) => {
  const { id } = req.params; // Get the transport ID from the URL params

  try {
    // Find the transport record
    const transport = await transportModel.findById(id);
    if (!transport) {
      return res.status(404).send({ msg: "Transport not found" });
    }

    // Delete the image from Cloudinary if it exists
    if (transport.cloudinary_id) {
      await cloudinary.uploader.destroy(transport.cloudinary_id);
    }

    // Delete the transport record from the database
    await transportModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      msg: "Transport deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting transport:", error);
    return res.status(500).send({ msg: "Failed to delete transport" });
  }
};
