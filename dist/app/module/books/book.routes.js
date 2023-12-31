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
router.post('/add-book', (0, auth_1.default)(), books_controller_1.BookController.AddBook);
// router.get("/review/:bookId", BookController.GetReview);
/* router.post('/review/:id', auth(), BookController.AddReview); */
router.get('/:bookId', books_controller_1.BookController.GetSingleBook);
router.patch('/:bookId', (0, auth_1.default)(), books_controller_1.BookController.UpdateBook);
router.delete('/:bookId', (0, auth_1.default)(), books_controller_1.BookController.DeleteBook);
router.get('/', books_controller_1.BookController.GetAllBooks);
exports.BookRoutes = router;
