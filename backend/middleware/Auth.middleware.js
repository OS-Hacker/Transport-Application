import JWT from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

// verify user is sign in or not / check user have token or not
export const requiredSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(402).send({
      success: false,
      msg: "Invalid Token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role === 1) {
      return next();
    } else {
      return res.status(402).send({
        success: false,
        msg: "Authorize User",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(402).send({
      success: false,
      msg: "Error in Admin",
    });
  }
};
