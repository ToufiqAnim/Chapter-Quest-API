import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import { Users } from '../user/user.model';
import { ILogin, ILoginResponse } from './auth.interface';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const CreateUser = async (user: IUser): Promise<IUser | null> => {
  const isExist = await Users.findOne({
    email: user.email,
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already exists!');
  }
  const createUser = await Users.create(user);
  if (!createUser) {
    throw new Error('Failed to create user!');
  }
  return createUser;
};

const Login = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await Users.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (
    isUserExist.password &&
    !(await Users.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
  }

  const { _id, name, email: userEmail } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, name, userEmail },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, name, userEmail },
    config.jwt.refresh as Secret,
    config.jwt.refresh_expires_in as string
  );

  const user = {
    id: isUserExist._id,
    name: isUserExist.name,
  };

  return {
    accessToken,
    user,
    refreshToken,
  };
};

const RefreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userEmail } = verifiedToken;

  const isUserExist = await Users.isUserExist(userEmail);
  if (!isUserExist) {
    const error = new ApiError(httpStatus.FORBIDDEN, 'User not exist');
    return error;
  }

  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      userEmail: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  CreateUser,
  Login,
  RefreshToken,
};
