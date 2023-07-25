import express from "express";
import { Request, Response } from "express";
import Finished from "../../models/schema/FinishedSchema";

const getCheckedByUserIdRouter = express.Router();

getCheckedByUserIdRouter.get(
    "/finished/:userId",
    async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;

            if (!userId) {
                return res
                    .status(400)
                    .json({ error: "User ID parameter missing" });
            }

            const finishedTodos = await Finished.find({
                userId,
                isChecked: true,
            });

            res.json({ finishedTodos });
        } catch (error) {
            console.error("Error fetching todos:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

export default getCheckedByUserIdRouter;
