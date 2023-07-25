import mongoose from "mongoose";

const mongoURI =
    "mongodb+srv://emanueldrusu:Mongowebgurus22@wgclusterlearn.gr0pdlo.mongodb.net/todoapp";

export const connectToDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
