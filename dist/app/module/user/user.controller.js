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
exports.UserController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResonse_1 = require("../../../shared/sendResonse");
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const GetUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.GetAllUsers();
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
}));
const GetUserById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.GetUserById(id);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
}));
const UpdateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield user_service_1.UserService.UpdateUser(id, updatedData);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User updated successfully",
        data: result,
    });
}));
const DeleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield user_service_1.UserService.DeleteUser(id);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User deleted successfully",
    });
}));
const GetUserProfile = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return;
    }
    const user = req.user;
    const result = yield user_service_1.UserService.GetUserProfile(user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's information retrieved successfully",
        data: result,
    });
}));
const AddToWishlist = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const bookId = req.params.bookId;
    const user = req.user;
    yield user_service_1.UserService.AddToWishlist(bookId, user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book added to wishlist successfully",
    });
}));
const GetWishlist = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return;
    }
    const user = req.user;
    const result = yield user_service_1.UserService.GetWishlists(user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book retrieved successfully from Wishlist",
        data: result,
    });
}));
const RemoveFromWishlist = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return;
    }
    const user = req.user;
    const bookId = req.params.bookId;
    yield user_service_1.UserService.RemoveFromWishlist(user, bookId);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book  removed successfully from Wishlist",
    });
}));
const AddToReadingList = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const bookId = req.params.bookId;
    const user = req.user;
    yield user_service_1.UserService.AddToReadingList(bookId, user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book added to Reading List successfully",
    });
}));
const GetReadingList = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return;
    }
    const user = req.user;
    const result = yield user_service_1.UserService.GetReadingLists(user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book retrieved successfully from Reading List",
        data: result,
    });
}));
const RemoveFromReadingList = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return;
    }
    const user = req.user;
    const bookId = req.params.bookId;
    if (!bookId) {
        return res.status(400).json({
            success: false,
            message: "Invalid bookId provided.",
        });
    }
    yield user_service_1.UserService.RemoveFromReadingList(user, bookId);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book successfully remove from Reading List",
    });
}));
const AddToFinishedBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const finishedBookId = req.params.finishedBookId;
    const user = req.user;
    yield user_service_1.UserService.AddToFinishedBook(finishedBookId, user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book added to Finished Book List successfully",
    });
}));
const GetFinishedBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return;
    }
    const user = req.user;
    const result = yield user_service_1.UserService.GetFinishedBooks(user);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book retrieved successfully from Finished Book List",
        data: result,
    });
}));
const RemoveFinishedBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return;
    }
    const user = req.user;
    const removeFBookId = req.params.removeFBookId;
    yield user_service_1.UserService.RemoveFinishedBooks(user, removeFBookId);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book successfully remove from Finished Books List",
    });
}));
exports.UserController = {
    GetUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
    GetUserProfile,
    GetWishlist,
    RemoveFromWishlist,
    AddToReadingList,
    AddToWishlist,
    GetReadingList,
    RemoveFromReadingList,
    AddToFinishedBook,
    GetFinishedBooks,
    RemoveFinishedBooks,
};
