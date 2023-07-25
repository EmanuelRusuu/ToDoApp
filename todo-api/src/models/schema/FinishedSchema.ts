import mongoose, { Document } from "mongoose";

interface Finished extends Document {
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

const todoSchema = new mongoose.Schema<Finished>({
    title: { type: String },
    text: { type: String },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
        default: "low",
    },
    isPriorityChange: { type: Boolean, default: false },
    isChecked: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    isEditing: { type: Boolean, default: false },
    userId: { type: String },
});

const Todo = mongoose.model<Finished>("finished", todoSchema);

export default Todo;
