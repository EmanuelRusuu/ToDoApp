import express from "express";
import { Request, Response } from "express";
import Todo from "../../models/schema/TodoSchema";

const addTaskRouter = express.Router();

addTaskRouter.post("/todos", async (req: Request, res: Response) => {
    try {
        const {
            title,
            text,
            priority,
            isPriorityChange,
            isChecked,
            isEditing,
            createdAt,
            userId,
        } = req.body;

        const newTodo = new Todo({
            title,
            text,
            priority,
            isPriorityChange,
            isChecked,
            isEditing,
            createdAt,
            userId,
        });

        await newTodo.save();

        res.status(201).json({
            message: "Todo added successfully",
            todo: newTodo,
        });
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default addTaskRouter;
