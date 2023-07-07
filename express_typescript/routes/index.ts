import express from "express";
import indexController from "../controllers";
import authController from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";

const indexRouter = express.Router();

indexRouter.use("/1", indexController.index);

indexRouter.use("/2", authMiddleware.isLoggedIn, indexController.index2);

indexRouter.use("/error", indexController.error);

export default indexRouter;
