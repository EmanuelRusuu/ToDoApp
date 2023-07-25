import express from "express";
import { Request, Response } from "express";
import Finished from "../../models/schema/FinishedSchema";

const deleteCheckedRouter = express.Router();

deleteCheckedRouter.delete(
    "/finished/:id",
    async (req: Request, res: Response) => {
        const taskId = req.params.id;

        try {
            const taskToDelete = await Finished.findById(taskId);

            if (!taskToDelete) {
                return res.status(404).json({ message: "Task not found" });
            }

            await Finished.findByIdAndDelete(taskId);
            return res
                .status(200)
                .json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error("Error deleting task:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

export default deleteCheckedRouter;
