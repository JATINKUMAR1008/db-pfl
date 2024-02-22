import { Router } from "express";
import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  loginProvider,
} from "../controllers/auth.controllers";
import { validateAuthToken } from "../middlewares/auth.middleware";
export const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.get("/user", validateAuthToken, getUser);
authRouter.put("/user", validateAuthToken, updateUser);
authRouter.delete("/user", validateAuthToken, deleteUser);
authRouter.post("/provider-login", loginProvider);
