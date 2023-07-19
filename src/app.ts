import express, { Application } from "express";
import cors from "cors";
import { BookRoutes } from "./app/module/books/book.routes";
import routes from "./app/routes";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

app.use("/api/v1/", routes);

export default app;
