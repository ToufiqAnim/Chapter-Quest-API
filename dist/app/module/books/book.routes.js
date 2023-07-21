"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/add-book", (0, auth_1.default)(), books_controller_1.BookController.AddBook);
router.get("/", (0, auth_1.default)(), books_controller_1.BookController.GetAllBooks);
router.get("/:id", books_controller_1.BookController.GetSingleBook);
router.delete("/:id", (0, auth_1.default)(), books_controller_1.BookController.DeleteBook);
router.patch("/:id", (0, auth_1.default)(), books_controller_1.BookController.UpdateBook);
router.get("/review/:bookId", books_controller_1.BookController.GetReview);
router.post("/review/:id", (0, auth_1.default)(), books_controller_1.BookController.AddReview);
exports.BookRoutes = router;
