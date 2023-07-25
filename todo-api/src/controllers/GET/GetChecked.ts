import express from "express";
import { Request, Response } from "express";
import Finished from "../../models/schema/FinishedSchema";

const getCheckedRouter = express.Router();

getCheckedRouter.get("/finished", async (req: Request, res: Response) => {
    try {
        const finishedTodos = await Finished.find({ isChecked: true });

        if (!finishedTodos || finishedTodos.length === 0) {
            return res.status(404).json({ error: "No finished todos found" });
        }

        res.json(finishedTodos);
    } catch (error) {
        console.error("Error fetching finished todos data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default getCheckedRouter;
