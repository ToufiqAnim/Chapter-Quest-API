import express, { Application } from "express";
import cors from "cors";
import { BookRoutes } from "./app/module/books/book.routes";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

app.use("/api/v1/", router);

app.use(globalErrorHandler);
export default app;
