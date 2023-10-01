import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { catchAsync } from '../../../shared/catchAsync';

import { ILoginResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { IUser } from '../user/user.interface';
import { sendResponse } from '../../../shared/sendResonse';

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await AuthService.signUpUser(user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await AuthService.loginUser(userData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successful!',
    data: others,
  });
});
export const AuthController = {
  signUpUser,
  loginUser,
};
