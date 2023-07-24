import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResonse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const GetUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.GetAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const GetUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.GetUserById(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const UpdateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UserService.UpdateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const DeleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await UserService.DeleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
  });
});

const GetUserProfile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return;
  }
  const user = req.user;
  const result = await UserService.GetUserProfile(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});
const AddToWishlist = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const bookId = req.params.bookId;
  const user = req.user;
  await UserService.AddToWishlist(bookId, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to wishlist successfully",
  });
});

const GetWishlist = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return;
  }
  const user = req.user;
  const result = await UserService.GetWishlists(user);

  sendResponse<string[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully from Wishlist",
    data: result,
  });
});

const RemoveFromWishlist = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return;
  }
  const user = req.user;
  const bookId = req.params.bookId;
  await UserService.RemoveFromWishlist(user, bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book  removed successfully from Wishlist",
  });
});

const AddToReadingList = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const bookId = req.params.bookId;
  const user = req.user;
  await UserService.AddToReadingList(bookId, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to Reading List successfully",
  });
});

const GetReadingList = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return;
  }
  const user = req.user;
  const result = await UserService.GetReadingLists(user);

  sendResponse<string[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully from Reading List",
    data: result,
  });
});

const RemoveFromReadingList = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return;
    }
    const user = req.user;
    const bookId = req.params.bookId;
    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Invalid bookId provided.",
      });
    }
    await UserService.RemoveFromReadingList(user, bookId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book successfully remove from Reading List",
    });
  }
);
const AddToFinishedBook = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const finishedBookId = req.params.finishedBookId;
  const user = req.user;
  await UserService.AddToFinishedBook(finishedBookId, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to Finished Book List successfully",
  });
});

const GetFinishedBooks = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return;
  }
  const user = req.user;
  const result = await UserService.GetFinishedBooks(user);

  sendResponse<string[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully from Finished Book List",
    data: result,
  });
});

const RemoveFinishedBooks = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return;
  }
  const user = req.user;
  const removeFBookId = req.params.removeFBookId;
  await UserService.RemoveFinishedBooks(user, removeFBookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book successfully remove from Finished Books List",
  });
});
export const UserController = {
  GetUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  GetUserProfile,
  GetWishlist,
  RemoveFromWishlist,
  AddToReadingList,
  AddToWishlist,
  GetReadingList,
  RemoveFromReadingList,
  AddToFinishedBook,
  GetFinishedBooks,
  RemoveFinishedBooks,
};
