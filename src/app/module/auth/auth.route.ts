import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.createAuthZodSchema),
  AuthController.login
);

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.signup
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
export const AuthRoutes = router;
