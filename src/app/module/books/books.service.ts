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
          $option: "i",
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
  /*   let query = Books.find();

  if (andConditions.length > 0) {
    query = query.and(andConditions);
  }

  const books = await query;

  if (!books) {
    throw new Error("No cow found!");
  }

  return books; */
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Books.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Books.findByIdAndDelete(id);
  return result;
};
export const BookService = {
  addBooks,
  getAllBooks,

  updateBook,
  deleteBook,
};
