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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const books_interface_1 = require("./books.interface");
const books_model_1 = require("./books.model");
const AddBook = (book, user) => __awaiter(void 0, void 0, void 0, function* () {
    const newAddedBook = yield books_model_1.Books.create(Object.assign(Object.assign({}, book), { publisher: user._id }));
    if (!newAddedBook) {
        throw new Error("Failed to create book!");
    }
    return newAddedBook;
});
const GetAllBooks = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: books_interface_1.bookSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield books_model_1.Books.find(whereConditions);
    return result;
});
const GetSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Books.findById({ _id: id }).populate({
        path: "reviews",
        model: "User",
    });
    if (!book) {
        throw new Error("No book found!");
    }
    return book;
});
const UpdateBook = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Books.findById({ id });
    if (!book) {
        throw new Error("No Book Found!!");
    }
    const updatedBook = yield books_model_1.Books.findByIdAndUpdate({ id }, payload, {
        new: true,
    });
    if (!updatedBook) {
        throw new Error("Failed to update book!");
    }
    return updatedBook;
});
const DeleteBook = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Books.findById(id);
    if (!book) {
        throw new Error("No book found!");
    }
    const deletedBook = yield books_model_1.Books.findByIdAndDelete(id);
    return deletedBook;
});
const GetReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Books.findById(reviewId).populate("reviews.reviewer");
    if (!book) {
        return null;
    }
    if (!book.reviews || book.reviews.length === 0) {
        return null;
    }
    const bookReviewer = book.reviews.map((review) => ({
        review: review.review,
        reviewer: review.reviewer ? { name: review.reviewer.name } : null,
    }));
    return bookReviewer;
});
const PostReview = (id, user, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Books.findById(id);
    if (!book) {
        throw new Error("No book found!");
    }
    const review = typeof reviewData === "string" ? reviewData : reviewData.review;
    const newReview = {
        review: review,
        reviewer: user._id,
    };
    book.reviews.push(newReview);
    const updatedBook = yield book.save();
    return updatedBook;
});
exports.BookService = {
    AddBook,
    GetAllBooks,
    GetSingleBook,
    UpdateBook,
    DeleteBook,
    PostReview,
    GetReview,
};
