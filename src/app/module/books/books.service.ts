import { IBook, IBookFilters, bookSearchableFields } from "./books.interface";
import { Books } from "./books.model";

const addBooks = async (book: IBook): Promise<IBook | null> => {
  const addBook = await Books.create({ ...book });
  if (!addBook) {
    throw new Error("Failed to add book");
  }
  return addBook;
};
const getAllBooks = async (filters: IBookFilters): Promise<IBook[]> => {
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
const getSingleBook = async (bookId: string): Promise<IBook | null> => {
  const book = await Books.findById(bookId);
  if (!book) {
    throw new Error("No book found!");
  }
  return book;
};

const updateBook = async (
  bookId: string,

  payload: Partial<IBook>
): Promise<IBook | null> => {
  const book = await Books.findById(bookId);

  if (!book) {
    throw new Error("No Book Found!!");
  }

  const updatedBook = await Books.findByIdAndUpdate({ _id: bookId }, payload, {
    new: true,
  });

  if (!updatedBook) {
    throw new Error("Failed to update book!");
  }

  return updatedBook;
};
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Books.findByIdAndDelete(id);
  return result;
};
export const BookService = {
  addBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
