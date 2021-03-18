import { User } from "../../models/User.model";
import { ValidateRegistrationData } from "../../validators/user.validator";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const RegisterUserController = async (req, res) => {
  try {
    let { err, value } = await ValidateRegistrationData(req.body);
    if (err) return res.status(400).json({ message: err.details[0].message });
    let user = await User.create(value);
    const { _id, email } = user;
    let token = await JWT.sign({ _id, email }, process.env.SecretKey, {
      issuer: "boyepanthera",
      expiresIn: "6h",
    });
    return res.status(201).json({ message: "registration successful", token });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const FetchAllUserController = async (req, res) => {
  try {
    let users = await User.find();
    return res.status(200).json({ message: "user fetched", users });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const FetchAUserController = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId);
    return res.status(200).json({ message: "user fetched", user });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const UpdateAUserController = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndUpdate(userId, value, { new: true });
    return res.status(200).json({ message: "user updated", user });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const DeleteAUserController = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "user deleted", user });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};
