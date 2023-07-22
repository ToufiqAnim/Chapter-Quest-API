import express from "express";
import { BookController } from "./books.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/add-book", auth(), BookController.AddBook);
router.get("/", BookController.GetAllBooks);
router.get("/:id", BookController.GetSingleBook);

router.delete("/:id", auth(), BookController.DeleteBook);
router.patch("/:id", auth(), BookController.UpdateBook);
router.get("/review/:bookId", BookController.GetReview);

router.post("/review/:id", auth(), BookController.AddReview);
export const BookRoutes = router;
