import { Model, ObjectId } from "mongoose";

export type IBook = {
  title: string;
  genre: string;
  author: string;
  publicationDate: string;
  image: string;
  description: string;
  publisher?: ObjectId;
  reviews?: object[];
};
export type IReview = {
  review: string;
  reviewer: { name: string } | null;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export const bookSearchableFields = ["title", "author", "gnre", "description"];

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: number;
};
