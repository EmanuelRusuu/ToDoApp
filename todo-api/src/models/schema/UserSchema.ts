import mongoose, { Document } from "mongoose";

interface User extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model<User>("users_credentials", userSchema);

export default User;
