/* import { Request, Response } from 'express';
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
 */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { catchAsync } from '../../../shared/catchAsync';

import { IUser } from '../user/user.interface';
import { ILoginResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { sendResponse } from '../../../shared/sendResonse';

const signup = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = req.body;
  const result = await AuthService.CreateUser(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.Login(loginData);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.RefreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

export const AuthController = {
  signup,
  login,
  refreshToken,
};
