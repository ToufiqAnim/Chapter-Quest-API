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
const books_constant_1 = require("./books.constant");
const sendResonse_1 = require("../../../shared/sendResonse");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../shared/catchAsync");
const AddBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const book = req.body;
    const user = req.user;
    const result = yield books_service_1.BookService.AddBook(book, user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book Created successfully',
        data: result,
    });
}));
const GetAllBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, books_constant_1.bookFilterableFields);
    const result = yield books_service_1.BookService.GetAllBooks(filters);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books retrieved successfully',
        data: result,
    });
}));
const GetReviews = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const result = yield books_service_1.BookService.GetReviews(bookId);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review retrieved successfully',
        data: result,
    });
}));
const GetSingleBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const result = yield books_service_1.BookService.GetSingleBook(bookId);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully',
        data: result,
    });
}));
const UpdateBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const bookId = req.params.bookId;
    const user = req.user;
    const updatedData = req.body;
    const result = yield books_service_1.BookService.UpdateBook(bookId, user, updatedData);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
}));
const DeleteBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const bookId = req.params.bookId;
    const user = req.user;
    const result = yield books_service_1.BookService.DeleteBook(bookId, user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted successfully',
    });
}));
const AddReview = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const id = req.params.id;
    const user = req.user;
    const reviewData = req.body;
    const result = yield books_service_1.BookService.PostReview(id, user, reviewData);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review posted Successfully',
        data: result,
    });
}));
exports.BookController = {
    AddBook,
    GetAllBooks,
    GetSingleBook,
    UpdateBook,
    DeleteBook,
    GetReviews,
    AddReview,
};
