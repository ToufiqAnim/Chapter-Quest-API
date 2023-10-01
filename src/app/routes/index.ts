import express from 'express';
import { BookRoutes } from '../module/books/book.routes';
import { AuthRoutes } from '../module/auth/auth.route';
import { UserRoutes } from '../module/user/user.routes';

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
