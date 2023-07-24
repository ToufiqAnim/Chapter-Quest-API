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
// WISHLIST
router.get("/wishlist", (0, auth_1.default)(), user_controller_1.UserController.GetWishlist);
router.get("/readingList", (0, auth_1.default)(), user_controller_1.UserController.GetReadingList);
router.post("/addToWishlist/:bookId", (0, auth_1.default)(), user_controller_1.UserController.AddToWishlist);
router.post("/addToReadingList/:bookId", (0, auth_1.default)(), user_controller_1.UserController.AddToReadingList);
router.post("/removeFromReadingList/:bookId", (0, auth_1.default)(), user_controller_1.UserController.RemoveFromReadingList);
router.post("/removeFromWishlist/:bookId", (0, auth_1.default)(), user_controller_1.UserController.RemoveFromWishlist);
//USER
router.get("/:id", user_controller_1.UserController.GetUserById);
router.patch("/:id", user_controller_1.UserController.UpdateUser);
router.delete("/:id", user_controller_1.UserController.DeleteUser);
router.get("/", user_controller_1.UserController.GetUsers);
router.get("/profile", user_controller_1.UserController.GetUserProfile);
exports.UserRoutes = router;
