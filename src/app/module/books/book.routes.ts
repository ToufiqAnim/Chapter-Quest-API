import express from 'express';
import { BookController } from './books.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/add-book', BookController.AddBook);
// router.get("/review/:bookId", BookController.GetReview);
router.post('/review/:id', BookController.AddReview);
router.get('/:bookId', BookController.GetSingleBook);
router.patch('/:bookId', BookController.UpdateBook);
router.delete('/:bookId', BookController.DeleteBook);

router.get('/', BookController.GetAllBooks);
export const BookRoutes = router;
