import { comparePass, heshPass, Token } from "../helper/Auth.helper.js";
import { userModel } from "../models/user.model.js";

// singUp-user
export const singUpController = async (req, res) => {
  try {
    const { name, number, email, password } = req.body;

    if (!name || !number || !email || !password) {
      return res.status(402).send({
        success: false,
        msg: "All Fileds Required",
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

    // Already Exist User

    const ExistUser = await userModel.findOne({ email });

    if (ExistUser) {
      return res.status(401).send({
        success: false,
        msg: "User Already Exist",
      });
    }

    // hesh password

    const heshedPass = await heshPass(password);

    const user = await new userModel({
      name,
      number,
      email,
      password: heshedPass,
    }).save();

    const token = await Token(user);

    return res.status(201).send({
      success: true,
      msg: "Registration Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      msg: "Registration Failed Try Again",
    });
  }
};

// login-user
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).send({
        success: false,
        msg: "All Fileds Required",
      });
    }

    // check Email

    const registerUser = await userModel.findOne({ email });

    if (!registerUser) {
      return res.status(401).send({
        success: false,
        msg: "Invalid Email & Password",
      });
    }

    // check password

    const matchPassword = await comparePass(password, registerUser.password);

    if (!matchPassword) {
      return res.status(401).send({
        success: false,
        msg: "Invalid Email & Password",
      });
    }

    // add token
    const token = await Token(registerUser);

    res.status(200).send({
      success: true,
      msg: "Login Successfully",
      user: {
        _id: registerUser._id,
        name: registerUser.name,
        number: registerUser.number,
        email: registerUser.email,
        role: registerUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      msg: "Login Failed Try Again",
    });
  }
};

// get All users
export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find({});

    res.status(200).send({
      success: true,
      msg: "users successfully get",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "Error in get users",
      error,
    });
  }
};

// get All users
export const deleteUserController = async (req, res) => {
  try {
    const users = await userModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      msg: "user successfully deleted",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "Error in get users",
      error,
    });
  }
};

// protect-user
export const protectUserController = async (req, res) => {
  try {
    await res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

// protect-admin
export const protectAdminController = async (req, res, next) => {
  try {
    await res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};
