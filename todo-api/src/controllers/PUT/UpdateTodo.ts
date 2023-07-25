import express from "express";
import { Request, Response } from "express";
import Todo from "../../models/schema/TodoSchema";
import mongoose from "mongoose";

const updateTodoRouter = express.Router();

updateTodoRouter.put("/todos/:todoId", async (req: Request, res: Response) => {
    try {
        const todoId = req.params.todoId;

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ error: "Invalid todoId" });
        }
        const updatedTodoData = req.body;

        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        Object.assign(todo, updatedTodoData);

        await todo.save();

        res.json({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default updateTodoRouter;
