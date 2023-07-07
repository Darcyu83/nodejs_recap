import express from "express";
import authController from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/login", authController.login);

export default authRouter;
