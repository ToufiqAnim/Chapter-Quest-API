"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const router = express_1.default.Router();
router.post("/add-books", books_controller_1.BookController.addBooks);
router.get("/", books_controller_1.BookController.getAllBooks);
router.get("/:id", books_controller_1.BookController.getSingleBook);
router.delete("/:id", books_controller_1.BookController.deleteBook);
router.patch("/:id", books_controller_1.BookController.updateBook);
exports.BookRoutes = router;
