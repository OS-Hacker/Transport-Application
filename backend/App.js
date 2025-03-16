import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./db/connectdb.js";
import userRouter from "./routes/user.routes.js";
import transportRoute from "./routes/transport.routes.js";
import bookingRouter from "./routes/booking.routes.js";

dotenv.config(); // Load environment variables

const App = express();

// Middleware
App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// Routers
App.use(userRouter);
App.use(transportRoute);
App.use(bookingRouter);

// Connect to database
connectdb();

App.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
