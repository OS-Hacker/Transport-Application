import express from "express";
import {
  createTransportController,
  deleteTransportController,
  getSingleTransportController,
  getTransportController,
  updateTransportController,
} from "../controller/transport.controller.js";
import { isAdmin, requiredSignIn } from "../middleware/Auth.middleware.js";
import upload from "./../helper/Multer.js";

const transportRoute = express.Router();

//  CREATE TRANSPORT
transportRoute.post(
  "/create-transport",
  upload.single("transportImage"),
  requiredSignIn,
  isAdmin,
  createTransportController
);

// GET TRANSPORTS
transportRoute.get("/get-transport", getTransportController);

//  SINGLE TRANSPORT
transportRoute.get(
  "/single-transport/:id",
  requiredSignIn,
  isAdmin,
  getSingleTransportController
);

// EDIT TRANSPORT
transportRoute.put(
  "/update-transport/:id",
  upload.single("transportImage"),
  requiredSignIn,
  isAdmin,
  updateTransportController
);

// DELETE TRANSPORT
transportRoute.delete(
  "/delete-transport/:id",
  requiredSignIn,
  isAdmin,
  deleteTransportController
);

export default transportRoute;
