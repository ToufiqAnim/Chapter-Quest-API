import { RequestHandler } from "express";
import { BookService } from "./books.service";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";
import { sendResponse } from "../../../shared/sendResonse";
import httpStatus from "http-status";
import { IBook, IReview } from "./books.interface";
import { catchAsync } from "../../../shared/catchAsync";

const AddBook = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const book = req.body;
  const user = req.user;
  const result = await BookService.AddBook(book, user);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Created successfully",
    data: result,
  });
});

const GetAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const result = await BookService.GetAllBooks(filters);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});
const GetReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const result = await BookService.GetReview(bookId);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully",
    data: result,
  });
});
const GetSingleBook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const result = await BookService.GetSingleBook(bookId);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});
const UpdateBook = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const bookId = req.params.bookId;

  const updatedData = req.body;
  const result = await BookService.UpdateBook(bookId, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});
const DeleteBook = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const bookId = req.params.bookId;
  const user = req.user;
  const result = await BookService.DeleteBook(bookId, user);

  res.status(200).json({
    success: true,
    message: "Selected Book deleted successfully!",
    data: result,
  });
});

const AddReview = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const id = req.params.id;
  const user = req.user;
  const reviewData = req.body;
  const result = await BookService.PostReview(id, user, reviewData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review posted Successfully",
    data: result,
  });
});

export const BookController = {
  AddBook,
  GetAllBooks,
  GetSingleBook,
  UpdateBook,
  DeleteBook,
  GetReview,
  AddReview,
};
