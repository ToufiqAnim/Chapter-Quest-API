import { JwtPayload } from 'jsonwebtoken';
import {
  IBook,
  IBookFilters,
  IReview,
  bookSearchableFields,
} from './books.interface';
import { Books } from './books.model';

//ADD BOOKS
const AddBook = async (
  book: IBook,
  user: JwtPayload
): Promise<IBook | null> => {
  const newAddedBook = await Books.create({ ...book, publisher: user._id });
  if (!newAddedBook) {
    throw new Error('Failed to create book!');
  }
  return newAddedBook;
};

//GET ALL BOOKS
const GetAllBooks = async (filters: IBookFilters): Promise<IBook[]> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
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

//GET REVIEWS
const GetReviews = async (bookId: string): Promise<IReview[] | null> => {
  const book = await Books.findById(bookId).populate('reviews.reviewer');
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

//GET SINGLE BOOK
const GetSingleBook = async (bookId: string): Promise<IBook | null> => {
  const book = await Books.findById(bookId).populate({
    path: 'reviews.reviewer',
    model: 'User',
    select: 'name',
  });
  if (!book) {
    throw new Error('No book found!');
  }
  return book;
};

//UPDATE BOOK
const UpdateBook = async (
  updateBookId: string,
  user: JwtPayload,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const book = await Books.findById(updateBookId);

  if (!book) {
    throw new Error('No book found!');
  }

  const areEqual = book.publisher && book.publisher.toString() === user._id;

  if (!areEqual) {
    throw new Error('You are not allowed to edit this book!');
  }

  if ('publisher' in payload) {
    throw new Error('Cannot update the publisher field');
  }

  const updatedBook = await Books.findByIdAndUpdate(updateBookId, payload, {
    new: true,
  });

  if (!updatedBook) {
    throw new Error('Failed to update book!');
  }

  return updatedBook;
};

//DELETE BOOK
const DeleteBook = async (bookId: string, user: JwtPayload): Promise<void> => {
  const book = await Books.findById(bookId);

  if (!book) {
    throw new Error('No book found!');
  }

  const areEqual = book.publisher && book.publisher.toString() === user._id;

  if (areEqual) {
    const deletedBook = await Books.findByIdAndDelete(bookId);
    if (!deletedBook) {
      throw new Error('No user found!');
    }
  }
};

//POST REVIEWS
const PostReview = async (
  id: string,
  user: JwtPayload,
  reviewData: string | { review: string }
): Promise<IBook> => {
  const book = await Books.findById(id);

  if (!book) {
    throw new Error('No book found!');
  }

  const review =
    typeof reviewData === 'string' ? reviewData : reviewData.review;

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
  GetReviews,
};
