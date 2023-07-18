import { IBook } from "./books.interface";
import { Books } from "./books.model";

const addBooks = async (book: IBook): Promise<IBook | null> => {
  const addBook = await Books.create({ ...book });
  return addBook;
};
const getAllBooks = async () => {
  const result = await Books.find();

  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Books.findById(id);
  return result;
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
  getSingleBook,
  updateBook,
  deleteBook,
};
