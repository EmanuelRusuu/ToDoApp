import mongoose, { Document } from "mongoose";

interface Todo extends Document {
    title: string;
    text: string;
    priority: Priority;
    isPriorityChange: boolean;
    isChecked: boolean;
    createdAt: Date;
    isEditing: boolean;
    userId: string;
}

type Priority = "low" | "medium" | "high";

const todoSchema = new mongoose.Schema<Todo>({
    title: { type: String, default: "Add a title" },
    text: { type: String, default: "Add a description" },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
        default: "low",
    },
    isPriorityChange: { type: Boolean, default: false },
    isChecked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    isEditing: { type: Boolean, default: false },
    userId: { type: String },
});

const Todo = mongoose.model<Todo>("todos", todoSchema);

export default Todo;
