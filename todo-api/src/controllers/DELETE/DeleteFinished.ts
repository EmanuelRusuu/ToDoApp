import express from "express";
import { Request, Response } from "express";
import Finished from "../../models/schema/FinishedSchema";

const deleteAllFinishedTodosRouter = express.Router();

deleteAllFinishedTodosRouter.delete(
    "/finished",
    async (req: Request, res: Response) => {
        try {
            const result = await Finished.deleteMany({});

            if (result.deletedCount === 0) {
                return res
                    .status(404)
                    .json({ message: "No finished todos found to delete" });
            }

            return res
                .status(200)
                .json({ message: "All finished todos deleted successfully" });
        } catch (error) {
            console.error("Error deleting all todos:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

export default deleteAllFinishedTodosRouter;
