"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("../module/books/book.routes");
const auth_route_1 = require("../module/auth/auth.route");
const user_routes_1 = require("../module/user/user.routes");
const review_route_1 = require("../module/review/review.route");
const wishlist_route_1 = require("../module/wishlist/wishlist.route");
const readingList_route_1 = require("../module/readingList/readingList.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/books',
        route: book_routes_1.BookRoutes,
    },
    {
        path: '/review',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/wishlist',
        route: wishlist_route_1.WishlistRoutes,
    },
    {
        path: '/reading-list',
        route: readingList_route_1.ReadingListRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
