import express from "express";
import { Request, Response } from "express";
import User from "../../models/schema/UserSchema";

const getUserRouter = express.Router();

getUserRouter.get("/user/:email", async (req: Request, res: Response) => {
    try {
        const userEmail = req.params.email;

        if (!userEmail) {
            return res.status(400).json({ error: "Email parameter missing" });
        }

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default getUserRouter;
