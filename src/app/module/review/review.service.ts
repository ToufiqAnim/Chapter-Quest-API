import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import { IReview } from './review.interface';
import { Review } from './review.model';
import { Books } from '../books/books.model';

const addReview = async (payload: IReview): Promise<IReview | null> => {
  // check if the book exist or not
  const isBookExist = await Books.findById(payload.book);

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist!');
  }

  const result = (await Review.create(payload)).populate('book');
  return result;
};

const getAllReviews = async (bookId: string) => {
  const result = await Review.find(
    {
      book: bookId,
    },
    {
      review: 1,
    }
  );

  return result;
};

export const ReviewService = {
  addReview,
  getAllReviews,
};
