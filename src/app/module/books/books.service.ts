import { JwtPayload } from "jsonwebtoken";
import {
  IBook,
  IBookFilters,
  IReview,
  bookSearchableFields,
} from "./books.interface";
import { Books } from "./books.model";

const AddBook = async (
  book: IBook,
  user: JwtPayload
): Promise<IBook | null> => {
  const newAddedBook = await Books.create({ ...book, publisher: user._id });
  if (!newAddedBook) {
    throw new Error("Failed to create book!");
  }
  return newAddedBook;
};
const GetAllBooks = async (filters: IBookFilters): Promise<IBook[]> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Books.find(whereConditions);
  return result;
};
const GetSingleBook = async (id: string): Promise<IBook | null> => {
  const book = await Books.findById({ _id: id }).populate({
    path: "reviews",
    model: "User",
  });
  if (!book) {
    throw new Error("No book found!");
  }
  return book;
};

const UpdateBook = async (
  id: string,

  payload: Partial<IBook>
): Promise<IBook | null> => {
  const book = await Books.findById({ id });
  if (!book) {
    throw new Error("No Book Found!!");
  }

  const updatedBook = await Books.findByIdAndUpdate({ id: id }, payload, {
    new: true,
  });

  if (!updatedBook) {
    throw new Error("Failed to update book!");
  }

  return updatedBook;
};
const DeleteBook = async (
  id: string,
  user: JwtPayload
): Promise<IBook | null> => {
  const book = await Books.findById(id);

  if (!book) {
    throw new Error("No book found!");
  }

  const deletedBook = await Books.findByIdAndDelete(id);
  return deletedBook;
};

const GetReview = async (reviewId: string): Promise<IReview[] | null> => {
  const book = await Books.findById(reviewId).populate("reviews.reviewer");
  if (!book) {
    return null;
  }
  if (!book.reviews || book.reviews.length === 0) {
    return null;
  }
  const bookReviewer: IReview[] = book.reviews.map((review: any) => ({
    review: review.review,
    reviewer: review.reviewer ? { name: review.reviewer.name } : null,
  }));
  return bookReviewer;
};
const PostReview = async (
  id: string,
  user: JwtPayload,
  reviewData: string | { review: string }
): Promise<IBook> => {
  const book = await Books.findById(id);

  if (!book) {
    throw new Error("No book found!");
  }

  const review =
    typeof reviewData === "string" ? reviewData : reviewData.review;

  const newReview: IReview = {
    review: review,
    reviewer: user._id,
  };

  book.reviews!.push(newReview);

  const updatedBook = await book.save();
  return updatedBook;
};
export const BookService = {
  AddBook,
  GetAllBooks,
  GetSingleBook,
  UpdateBook,
  DeleteBook,
  PostReview,
  GetReview,
};
