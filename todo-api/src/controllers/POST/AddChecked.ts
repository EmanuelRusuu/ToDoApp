import express from "express";
import { Request, Response } from "express";
import Finished from "../../models/schema/FinishedSchema";

const addCheckedRouter = express.Router();

addCheckedRouter.post("/finished", async (req: Request, res: Response) => {
    try {
        const {
            title,
            text,
            priority,
            isPriorityChange,
            isChecked,
            createdAt,
            isEditing,
            userId,
        } = req.body;

        const newTodo = new Finished({
            title,
            text,
            priority,
            isPriorityChange,
            isChecked,
            createdAt,
            isEditing,
            userId,
        });

        const savedTodo = await newTodo.save();

        res.status(201).json({
            message: "Todo added to finished todos successfully",
            todo: savedTodo,
        });
    } catch (error) {
        console.error("Error adding todo to finished todos:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default addCheckedRouter;
