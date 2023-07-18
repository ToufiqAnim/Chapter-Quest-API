import { RequestHandler } from "express";
import { BookService } from "./books.service";
import { Books } from "./books.model";

const addBooks: RequestHandler = async (req, res, next) => {
  try {
    const { ...bookData } = req.body;
    const result = await BookService.addBooks(bookData);
    res.status(200).json({
      success: true,
      message: "Book added to Database successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllBooks: RequestHandler = async (req, res, next) => {
  const result = await BookService.getAllBooks();
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully!",
    data: result,
  });
};
const getSingleBook: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully!",
    data: result,
  });
};
const updateBook: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await BookService.updateBook(id, updatedData);

  res.status(200).json({
    success: true,
    message: "Books updated successfully!",
    data: result,
  });
};
const deleteBook: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  const result = await BookService.deleteBook(id);

  res.status(200).json({
    success: true,
    message: "Books deleted successfully!",
    data: result,
  });
};
export const BookController = {
  addBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
