import express from "express";
import { connectToDB } from "./dbConnection";
import loginRouter from "./routes/Login";
import signupRouter from "./routes/Signup";
import getUsersRouter from "./controllers/GET/GetUsers";
import getUserRouter from "./controllers/GET/GetUser";
import bodyParser from "body-parser";
import getTodosRouter from "./controllers/GET/GetTodos";
import addTaskRouter from "./controllers/POST/AddTask";
import getTodosByUserIdRouter from "./controllers/GET/GetTodosByUser";
import deleteTaskRouter from "./controllers/DELETE/DeleteTask";
import getCheckedByUserIdRouter from "./controllers/GET/GetCheckedByUser";
import getCheckedRouter from "./controllers/GET/GetChecked";
import updateTodoRouter from "./controllers/PUT/UpdateTodo";
import addCheckedRouter from "./controllers/POST/AddChecked";
import deleteCheckedRouter from "./controllers/DELETE/DeleteChecked";
import deleteAllTodosRouter from "./controllers/DELETE/DeleteTodos";
import deleteAllFinishedTodosRouter from "./controllers/DELETE/DeleteFinished";

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

connectToDB();
app.use(loginRouter);
app.use(signupRouter);
app.use(getUsersRouter);
app.use(getUserRouter);
app.use(getTodosRouter);
app.use(addTaskRouter);
app.use(getTodosByUserIdRouter);
app.use(deleteTaskRouter);
app.use(getCheckedByUserIdRouter);
app.use(getCheckedRouter);
app.use(updateTodoRouter);
app.use(addCheckedRouter);
app.use(deleteCheckedRouter);
app.use(deleteAllTodosRouter);
app.use(deleteAllFinishedTodosRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
