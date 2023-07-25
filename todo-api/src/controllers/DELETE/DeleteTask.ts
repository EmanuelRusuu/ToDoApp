import express from "express";
import { Request, Response } from "express";
import Todo from "../../models/schema/TodoSchema";

const deleteTaskRouter = express.Router();

deleteTaskRouter.delete("/todos/:id", async (req: Request, res: Response) => {
    const taskId = req.params.id;

    try {
        const taskToDelete = await Todo.findById(taskId);

        if (!taskToDelete) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Todo.findByIdAndDelete(taskId);
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default deleteTaskRouter;
