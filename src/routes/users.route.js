import { Router } from "express";
import {
  deleteUserById,
  getAllUser,
  loginUser,
  registerUser,
  findUserById,
  updateUserById,
} from "../controllers/users.controller.js";

const route = Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/users", getAllUser);
route.get("/users/:id", findUserById);
route.delete("/user/:id", deleteUserById);
route.put("/users/:id", updateUserById);
export default route;
