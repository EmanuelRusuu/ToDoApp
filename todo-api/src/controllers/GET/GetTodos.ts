import express from "express";
import { Request, Response } from "express";
import Todo from "../../models/schema/TodoSchema";

const getTodosRouter = express.Router();

getTodosRouter.get("/todos", async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({});

        if (!todos || todos.length === 0) {
            return res.status(404).json({ error: "No todos found" });
        }

        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default getTodosRouter;
