import { Model } from "mongoose";

export type IReader = {
  name: string;
  email: string;
  password: string;
  wishlist: string[];
  readingList: string[];
  finishedBooks: string[];
};

export type IFindReader = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

export type ReaderModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IFindReader, "_id" | "name" | "email" | "password">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IReader>;
