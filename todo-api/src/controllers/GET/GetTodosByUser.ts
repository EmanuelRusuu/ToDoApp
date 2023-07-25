import express from "express";
import { Request, Response } from "express";
import Todo from "../../models/schema/TodoSchema";

const getTodosByUserIdRouter = express.Router();

getTodosByUserIdRouter.get(
    "/todos/:userId",
    async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;

            if (!userId) {
                return res
                    .status(400)
                    .json({ error: "User ID parameter missing" });
            }

            const todos = await Todo.find({ userId, isChecked: false });

            res.json({ todos });
        } catch (error) {
            console.error("Error fetching todos:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

export default getTodosByUserIdRouter;
