"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/*
const CreateUser = async (user: IUser): Promise<IUser | null> => {
  const isExist = await Users.findOne({
    email: user.email,
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already exists!');
  }
  const createdUser = await Users.create(user);
  if (!createdUser) {
    throw new Error('Failed to create user!');
  }
  const { email: userEmail } = createdUser;
  const accessToken = jwtHelpers.createToken(
    { userEmail },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  return {
    createdUser,
    accessToken,
  };
}; */
const signUpUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.Users.findOne({ email: userData.email });
    if (userExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'This email already exist');
    }
    const createdUser = yield user_model_1.Users.create(userData);
    if (!createdUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed To Sign Up');
    }
    const { email: userEmail } = createdUser;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail }, config_1.default.jwt.secret, config_1.default.jwt.secret_expires_in);
    return {
        createdUser,
        accessToken,
    };
});
/* const Login = async (payload: ILogin): Promise<ILoginResponse> => {
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
}; */
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    const isUserExist = yield user_model_1.Users.findOne({ email: email });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (isUserExist.password && !isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const { email: userEmail, name } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail }, config_1.default.jwt.secret, config_1.default.jwt.secret_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail }, config_1.default.jwt.refresh, config_1.default.jwt.refresh_expires_in);
    return {
        name,
        email,
        accessToken,
        refreshToken,
    };
});
exports.AuthService = {
    signUpUser,
    loginUser,
};
