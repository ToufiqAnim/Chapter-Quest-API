import express from "express";
import { BookRoutes } from "../module/books/book.routes";

const routes = express.Router();
const moduleRoutes = [{ path: "/books", route: BookRoutes }];
moduleRoutes.forEach((route) => routes.use(route.path, route.route));
export default routes;
