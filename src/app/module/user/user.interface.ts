import { Model, ObjectId, Types } from 'mongoose';

export type IUser = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  wishlist: string[];
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
  ): Promise<Pick<IFindUser, '_id' | 'name' | 'email' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
