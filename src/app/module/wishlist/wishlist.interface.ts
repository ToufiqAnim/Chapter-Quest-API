import { Model, Types } from 'mongoose';
import { IBook } from '../books/books.interface';
import { IUser } from '../user/user.interface';
export type IWishlist = {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
