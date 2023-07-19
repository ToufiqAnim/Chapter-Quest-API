import { Model } from "mongoose";

export type IReview = {
  review: string;
  reviewer: { name: string } | null;
};
export type ReviewModel = Model<IReview, Record<string, unknown>>;
