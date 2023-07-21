import express from "express";
import { BookController } from "./books.controller";

const router = express.Router();

router.post("/add-book", BookController.AddBook);
router.get("/", BookController.GetAllBooks);
router.get("/:id", BookController.GetSingleBook);

router.delete("/:id", BookController.DeleteBook);
router.patch("/:id", BookController.UpdateBook);
export const BookRoutes = router;
