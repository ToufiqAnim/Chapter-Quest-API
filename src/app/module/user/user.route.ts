import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
const router = express.Router();

//USER
router.get("/", UserController.GetUsers);
router.get("/profile", UserController.GetUserProfile);

router.get("/:id", UserController.GetUserById);
router.patch("/:id", UserController.UpdateUser);
router.delete("/:id", UserController.DeleteUser);

// WISHLIST
router.get("/wishlist", auth(), UserController.GetWishlist);
router.post("/addToWishlist/:bookId", auth(), UserController.AddToWishlist);
router.post(
  "/removeFromWishlist/:bookId",
  auth(),
  UserController.RemoveFromWishlist
);
//READING LIST
router.get("/readingList", auth(), UserController.GetReadingList);
router.post(
  "/addToReadingList/:bookId",
  auth(),
  UserController.AddToReadingList
);

router.post(
  "/removeFromReadingList/:bookId",
  auth(),
  UserController.RemoveFromReadingList
);
export const UserRoutes = router;
