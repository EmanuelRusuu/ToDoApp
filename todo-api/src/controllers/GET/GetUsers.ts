import express from "express";
import { Request, Response } from "express";
import User from "../../models/schema/UserSchema";

const getUsersRouter = express.Router();

getUsersRouter.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await User.find({});

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        res.json(users);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default getUsersRouter;
