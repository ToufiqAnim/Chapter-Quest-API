import { Schema, model } from "mongoose";
import config from "../../../config";
import { IFindReader, IReader, ReaderModel } from "./reader.interface";

const ReaderSchema = new Schema<IReader, ReaderModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    wishlist: [{ type: Schema.Types.ObjectId, default: [], ref: "Book" }],
    readingList: [{ type: Schema.Types.ObjectId, default: [], ref: "Book" }],
    finishedBooks: [{ type: Schema.Types.ObjectId, default: [], ref: "Book" }],
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
      },
    },
    timestamps: true,
    versionKey: false,
  }
);

ReaderSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IFindReader, "_id" | "email" | "password"> | null> {
  return await User.findOne(
    { email },
    { _id: 1, name: 1, email: 1, password: 1 }
  );
};

ReaderSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Pre-save middleware function
ReaderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const User = model<IReader, ReaderModel>("Reader", ReaderSchema);
