import express from 'express';
import { BookRoutes } from '../module/books/book.routes';
import { AuthRoutes } from '../module/auth/auth.route';
import { UserRoutes } from '../module/user/user.routes';
import { ReviewRoutes } from '../module/review/review.route';
import { WishlistRoutes } from '../module/wishlist/wishlist.route';
import { ReadingListRoutes } from '../module/readingList/readingList.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/reading-list',
    route: ReadingListRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
