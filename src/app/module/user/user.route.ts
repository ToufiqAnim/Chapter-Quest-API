import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
const router = express.Router();

// WISHLIST
router.get("/wishlist", auth(), UserController.GetWishlist);
router.get("/readingList", auth(), UserController.GetReadingList);
router.post("/addToWishlist/:bookId", auth(), UserController.AddToWishlist);

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
router.post(
  "/removeFromWishlist/:bookId",
  auth(),
  UserController.RemoveFromWishlist
);

//USER

router.get("/:id", UserController.GetUserById);
router.patch("/:id", UserController.UpdateUser);
router.delete("/:id", UserController.DeleteUser);
router.get("/", UserController.GetUsers);
router.get("/profile", UserController.GetUserProfile);

export const UserRoutes = router;
