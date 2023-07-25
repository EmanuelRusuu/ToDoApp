import express from "express";
import { signup } from "../controllers/SignupController";

const signupRouter = express.Router();

signupRouter.post("/users", signup);

export default signupRouter;
