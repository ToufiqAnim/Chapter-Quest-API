import { RequestHandler } from "express";
import { BookService } from "./books.service";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";
import { sendResponse } from "../../../shared/sendResonse";
import httpStatus from "http-status";
import { IBook } from "./books.interface";
import { catchAsync } from "../../../shared/catchAsync";

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
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const result = await BookService.getAllBooks(filters);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});
/* const getSingleBook: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully!",
    data: result,
  });
}; */
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
  // getSingleBook,
  updateBook,
  deleteBook,
};
