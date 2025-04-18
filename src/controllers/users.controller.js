import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/users.model.js";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ Erorr: "All Fields are required!" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json({ Error: "User Already Exist" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    res
      .status(201)
      .json({ message: "User has been created Successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Server Error", detail: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server error", detail: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server error", detail: error.message });
  }
};

export const findUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }
    const users = await User.findById(id);
    if (!users) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server error", detail: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.json({ message: "User has been deleted", users: user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server error", detail: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid User ID Format" });
    const user = await User.findByIdAndUpdate(id, { name: name, email: email });
    if (!user) return res.status(400).json({ error: "User Not Found" });
    return res.json({ message: "User has been updated", Updated_User: user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server error", detail: error.message });
  }
};
