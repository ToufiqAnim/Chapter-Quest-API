import { Model, Schema } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  password: string;
  wishlist: Schema.Types.ObjectId[];
  readingList: string[];
  finishedBooks: string[];
};

export type IFindUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IFindUser, "_id" | "name" | "email" | "password">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
