import express from "express";
import { Request, Response } from "express";
import Todo from "../../models/schema/TodoSchema";

const deleteAllTodosRouter = express.Router();

deleteAllTodosRouter.delete("/todos", async (req: Request, res: Response) => {
    try {
        const result = await Todo.deleteMany({});

        if (result.deletedCount === 0) {
            return res
                .status(404)
                .json({ message: "No todos found to delete" });
        }

        return res
            .status(200)
            .json({ message: "All todos deleted successfully" });
    } catch (error) {
        console.error("Error deleting all todos:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default deleteAllTodosRouter;
