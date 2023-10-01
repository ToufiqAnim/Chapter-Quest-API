import { Model, Types } from 'mongoose';
import { IBook } from '../books/books.interface';
import { IUser } from '../user/user.interface';

export type IReadingList = {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
  isFinished: boolean;
};

export type ReadingListModel = Model<IReadingList, Record<string, unknown>>;
