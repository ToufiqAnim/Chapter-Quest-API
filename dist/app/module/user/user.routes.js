"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// Bonus part
// router.get('/wishlist', auth(), UserController.GetWishlist);
// router.get('/readingList', auth(), UserController.GetReadingList);
// router.get('/finishedBooks', auth(), UserController.GetFinishedBooks);
// router.post('/addToWishlist/:bookId', auth(), UserController.AddToWishlist);
router.post('/addToReadingList/:bookId', 
// auth(),
user_controller_1.UserController.AddToReadingList);
router.post('/addToFinishedBook/:bookId', 
// auth(),
user_controller_1.UserController.AddToFinishedBook);
router.post('/removeFromWishlist/:bookId', 
// auth(),
user_controller_1.UserController.RemoveFromWishlist);
router.post('/removeFromReadingList/:bookId', 
// auth(),
user_controller_1.UserController.RemoveFromReadingList);
router.post('/removeFromFinishedBooks/:bookId', 
// auth(),
user_controller_1.UserController.RemoveFinishedBooks);
//user
router.get('/:id', 
//  auth(),
user_controller_1.UserController.GetUserById);
router.patch('/:id', 
//  auth(),
user_controller_1.UserController.UpdateUser);
router.delete('/:id', 
// auth(),
user_controller_1.UserController.DeleteUser);
router.get('/', 
// auth(),
user_controller_1.UserController.GetUsers);
router.get('/my-profile', 
//  auth(),
user_controller_1.UserController.GetUserProfile);
exports.UserRoutes = router;
