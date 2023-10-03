import express from 'express';
import auth from '../../middleware/auth';
import { UserController } from './user.controller';

const router = express.Router();

// Bonus part
router.get('/wishlist', auth(), UserController.GetWishlist);
router.get('/readingList', auth(), UserController.GetReadingList);
router.get('/finishedBooks', auth(), UserController.GetFinishedBooks);
router.post('/addToWishlist/:bookId', auth(), UserController.AddToWishlist);
router.post(
  '/addToReadingList/:bookId',
  auth(),
  UserController.AddToReadingList
);
router.post(
  '/addToFinishedBook/:bookId',
  auth(),
  UserController.AddToFinishedBook
);

router.post(
  '/removeFromWishlist/:bookId',
  auth(),
  UserController.RemoveFromWishlist
);

router.post(
  '/removeFromReadingList/:bookId',
  auth(),
  UserController.RemoveFromReadingList
);

router.post(
  '/removeFromFinishedBooks/:bookId',
  auth(),
  UserController.RemoveFinishedBooks
);

//user
router.get('/:id', auth(), UserController.GetUserById);
router.patch('/:id', auth(), UserController.UpdateUser);
router.delete('/:id', auth(), UserController.DeleteUser);

router.get('/', UserController.GetUsers);
router.get('/my-profile', auth(), UserController.GetUserProfile);

export const UserRoutes = router;
