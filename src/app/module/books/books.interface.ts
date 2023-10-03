import { Model, ObjectId } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  image: string;
  description: string;
  genre: string;
  publicationDate: string;
  publisher?: ObjectId;
  reviews?: object[];
};

export type IReview = {
  review: string;
  reviewer: { name: string } | null;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export const bookSearchableFields = ['title', 'author', 'genre', 'description'];

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: number;
};
