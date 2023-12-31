"use strict";
// import httpStatus from 'http-status';
// import { IUser } from '../user/user.interface';
// import { Users } from '../user/user.model';
// import { IUserLogin, ILoginResponse } from './auth.interface';
// import ApiError from '../../../errors/ApiError';
// import { jwtHelpers } from '../../../helpers/jwtHelpers';
// import config from '../../../config';
// import { Secret } from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
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
// /*
// const CreateUser = async (user: IUser): Promise<IUser | null> => {
//   const isExist = await Users.findOne({
//     email: user.email,
//   });
//   if (isExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User Already exists!');
//   }
//   const createdUser = await Users.create(user);
//   if (!createdUser) {
//     throw new Error('Failed to create user!');
//   }
//   const { email: userEmail } = createdUser;
//   const accessToken = jwtHelpers.createToken(
//     { userEmail },
//     config.jwt.secret as Secret,
//     config.jwt.secret_expires_in as string
//   );
//   return {
//     createdUser,
//     accessToken,
//   };
// }; */
// const signUpUser = async (userData: IUser) => {
//   const userExist = await Users.findOne({ email: userData.email });
//   if (userExist) {
//     throw new ApiError(httpStatus.CONFLICT, 'This email already exist');
//   }
//   const createdUser = await Users.create(userData);
//   if (!createdUser) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Sign Up');
//   }
//   const { email: userEmail } = createdUser;
//   const accessToken = jwtHelpers.createToken(
//     { userEmail },
//     config.jwt.secret as Secret,
//     config.jwt.secret_expires_in as string
//   );
//   return {
//     createdUser,
//     accessToken,
//   };
// };
// /* const Login = async (payload: ILogin): Promise<ILoginResponse> => {
//   const { email, password } = payload;
//   const isUserExist = await Users.findOne({ email });
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   if (
//     isUserExist.password &&
//     !(await Users.isPasswordMatched(password, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
//   }
//   const { _id, name, email: userEmail } = isUserExist;
//   const accessToken = jwtHelpers.createToken(
//     { _id, name, userEmail },
//     config.jwt.secret as Secret,
//     config.jwt.secret_expires_in as string
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { _id, name, userEmail },
//     config.jwt.refresh as Secret,
//     config.jwt.refresh_expires_in as string
//   );
//   const user = {
//     id: isUserExist._id,
//     name: isUserExist.name,
//   };
//   return {
//     accessToken,
//     user,
//     refreshToken,
//   };
// };
// const RefreshToken = async (token: string) => {
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh as Secret);
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }
//   const { userEmail } = verifiedToken;
//   const isUserExist = await Users.isUserExist(userEmail);
//   if (!isUserExist) {
//     const error = new ApiError(httpStatus.FORBIDDEN, 'User not exist');
//     return error;
//   }
//   //generate new token
//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: isUserExist._id,
//       userEmail: isUserExist.email,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.secret_expires_in as string
//   );
//   return {
//     accessToken: newAccessToken,
//   };
// }; */
// const loginUser = async (userData: IUserLogin) => {
//   const { email, password } = userData;
//   const isUserExist = await Users.findOne({ email: email });
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   const isPasswordMatched = await bcrypt.compare(
//     password,
//     isUserExist.password
//   );
//   if (isUserExist.password && !isPasswordMatched) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }
//   const { email: userEmail, name } = isUserExist;
//   const accessToken = jwtHelpers.createToken(
//     { userEmail },
//     config.jwt.secret as Secret,
//     config.jwt.secret_expires_in as string
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { userEmail },
//     config.jwt.refresh as Secret,
//     config.jwt.refresh_expires_in as string
//   );
//   return {
//     name,
//     email,
//     accessToken,
//     refreshToken,
//   };
// };
// export const AuthService = {
//   signUpUser,
//   loginUser,
// };
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("../user/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const CreateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createUser = yield user_model_1.Users.create(user);
    if (!createUser) {
        throw new Error('Failed to create user!');
    }
    return createUser;
});
const Login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.Users.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (isUserExist.password &&
        !(yield user_model_1.Users.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password is incorrect');
    }
    // create access token & refresh token
    const { _id, name, email: userEmail } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, name, userEmail }, config_1.default.jwt.secret, config_1.default.jwt.secret_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, name, userEmail }, config_1.default.jwt.refresh, config_1.default.jwt.refresh_expires_in);
    const user = {
        id: isUserExist._id,
        name: isUserExist.name,
    };
    return {
        accessToken,
        user,
        refreshToken,
    };
});
const RefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    // checking deleted user's refresh token
    const { userEmail } = verifiedToken;
    const isUserExist = yield user_model_1.Users.isUserExist(userEmail);
    if (!isUserExist) {
        const error = new ApiError_1.default(http_status_1.default.FORBIDDEN, 'User not exist');
        return error;
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        userEmail: isUserExist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.secret_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    CreateUser,
    Login,
    RefreshToken,
};
