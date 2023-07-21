"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
//USER
router.get("/", user_controller_1.UserController.GetUsers);
router.get("/my-profile", user_controller_1.UserController.GetUserProfile);
router.get("/:id", user_controller_1.UserController.GetUserById);
router.patch("/:id", user_controller_1.UserController.UpdateUser);
router.delete("/:id", user_controller_1.UserController.DeleteUser);
// WISHLIST
router.get("/wishlist", (0, auth_1.default)(), user_controller_1.UserController.GetWishlist);
router.post("/addToWishlist/:bookId", (0, auth_1.default)(), user_controller_1.UserController.AddToWishlist);
router.post("/removeFromWishlist/:removeWBookId", (0, auth_1.default)(), user_controller_1.UserController.RemoveFromWishlist);
//READING LIST
router.get("/readingList", (0, auth_1.default)(), user_controller_1.UserController.GetReadingList);
router.post("/addToReadingList/:readingBookId", (0, auth_1.default)(), user_controller_1.UserController.AddToReadingList);
router.post("/removeFromReadingList/:removeRBookId", (0, auth_1.default)(), user_controller_1.UserController.RemoveFromReadingList);
exports.UserRoutes = router;
