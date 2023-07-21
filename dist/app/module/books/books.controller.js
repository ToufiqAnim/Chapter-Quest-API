"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const books_service_1 = require("./books.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_constant_1 = require("./book.constant");
const sendResonse_1 = require("../../../shared/sendResonse");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../shared/catchAsync");
const AddBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const book = req.body;
    const user = req.user;
    const result = yield books_service_1.BookService.AddBooks(book, user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books Created successfully",
        data: result,
    });
});
const getAllBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
    const result = yield books_service_1.BookService.GetAllBooks(filters);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books retrieved successfully",
        data: result,
    });
}));
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BookService.GetSingleBook(id);
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully!",
        data: result,
    });
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const id = req.params.id;
    const user = req.user;
    const updatedData = req.body;
    const result = yield books_service_1.BookService.UpdateBook(id, user, updatedData);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book updated successfully",
        data: result,
    });
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const id = req.params.id;
    const user = req.user;
    const result = yield books_service_1.BookService.DeleteBook(id, user);
    res.status(200).json({
        success: true,
        message: "Selected Book deleted successfully!",
        data: result,
    });
});
exports.BookController = {
    addBooks: AddBooks,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
