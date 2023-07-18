import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./books.interface";

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        review: {
          type: String,
        },
        reviewer: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Books = model<IBook, BookModel>("Books", BookSchema);
