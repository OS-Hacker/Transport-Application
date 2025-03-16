import express from "express";
import {
  deleteUserController,
  getUserController,
  loginController,
  protectAdminController,
  protectUserController,
  singUpController,
} from "../controller/user.controller.js";
import { isAdmin, requiredSignIn } from "../middleware/Auth.middleware.js";

// import { isAdmin, requiredSignIn } from "../middleware/AuthMiddleware.js";
// import { getUserController } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/signUp", singUpController);

userRouter.post("/login", loginController);

// get all users
userRouter.get("/get-users", requiredSignIn, isAdmin, getUserController);

// delete user
userRouter.delete("/delete-user/:id", requiredSignIn, isAdmin, deleteUserController);

// user Protected Routes
userRouter.get("/user-protect", requiredSignIn, protectUserController);

// user Protected Routes
userRouter.get(
  "/admin-protect",
  requiredSignIn,
  isAdmin,
  protectAdminController
);

export default userRouter;
