import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.createAuthZodSchema),
  AuthController.loginUser
);

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.signUpUser
);

export const AuthRoutes = router;
