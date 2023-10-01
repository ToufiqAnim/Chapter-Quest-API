import { Model, Types } from 'mongoose';
import { IBook } from '../books/books.interface';

export type IReview = {
  review: string;
  book: Types.ObjectId | IBook;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
