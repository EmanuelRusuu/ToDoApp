import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/schema/UserSchema";
import { ERROR_MESSAGES } from "../utils/constants";

export async function signup(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({ error: ERROR_MESSAGES.alreadyExistingEmail });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res
            .status(201)
            .json({ message: ERROR_MESSAGES.userCreatedSuccessfully });
    } catch (err) {
        console.error(ERROR_MESSAGES.signUpError, err);
        return res.status(500).json({ error: ERROR_MESSAGES.serverError });
    }
}
