import express, { Application } from "express";
import cors from "cors";
import { BookRoutes } from "./app/module/books/book.routes";
import { UserRoutes } from "./app/module/user/user.route";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

app.use("/api/v1/books/", BookRoutes);
app.use("/api/v1/user/", UserRoutes);

export default app;
