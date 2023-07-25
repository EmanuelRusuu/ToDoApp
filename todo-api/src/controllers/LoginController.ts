import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ERROR_MESSAGES, MESSAGES } from "../utils/constants";
import User from "../models/schema/UserSchema";
import dotenv from "dotenv";

dotenv.config();

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ message: ERROR_MESSAGES.userNotFound });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: ERROR_MESSAGES.invalidLoginCredentials });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "default-secret-key",
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            }
        );

        return res.json({ message: MESSAGES.loginSuccessfull, token });
    } catch (err) {
        console.error(ERROR_MESSAGES.logInError, err);
        return res.status(500).json({ message: ERROR_MESSAGES.serverError });
    }
}
