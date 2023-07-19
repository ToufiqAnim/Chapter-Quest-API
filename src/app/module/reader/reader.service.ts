import { IBook } from "../books/books.interface";
import { Books } from "../books/books.model";
import { IReview } from "./reader.interface";

const GetReview = async (reviewId: string): Promise<IReview[] | null> => {
  const book = await Books.findById(reviewId).populate("reviews.reviewer");
  if (!book) {
    return null;
  }
  if (!book.reviews || book.reviews.length === 0) {
    return null;
  }
  const bookReviewer: IReview[] = book.reviews.map((review: any) => ({
    review: review.review,
    reviewer: review.reviewer ? { name: review.reviewer.name } : null,
  }));
  return bookReviewer;
};

export const ReviewService = {
  GetReview,
  PostReview,
};
