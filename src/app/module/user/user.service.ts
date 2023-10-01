import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user.interface';
import { Users } from './user.model';

// user SECTION
const GetAllUsers = async (): Promise<IUser[] | null> => {
  const allUsers = await Users.find({});
  if (!allUsers) {
    throw new Error('No user found!');
  }
  return allUsers;
};

const GetUserById = async (id: string): Promise<IUser | null> => {
  const user = await Users.findById(id);
  if (!user) {
    throw new Error('No user found!');
  }
  return user;
};

const UpdateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { email, ...updatePayload } = payload;

  const user = await Users.findById(id);
  if (!user) {
    throw new Error('No user found!');
  }

  if (email && email !== user.email) {
    throw new Error('Updating email is not allowed!');
  }
  Object.assign(user, updatePayload);

  const updateduser = await user.save();
  return updateduser;
};

const DeleteUser = async (id: string): Promise<void> => {
  const deleteduser = await Users.findByIdAndDelete(id);
  if (!deleteduser) {
    throw new Error('No user found!');
  }
};
const GetUserProfile = async (user: JwtPayload): Promise<IUser | null> => {
  const { _id } = user;
  console.log(user);

  const userProfile = await Users.findById(_id).exec();

  return userProfile;
};
const AddToWishlist = async (
  bookId: string,
  user: JwtPayload
): Promise<void> => {
  const { _id } = user;
  const userProfile = await Users.findById(_id);

  if (!userProfile) {
    throw new Error('User not found');
  }

  if (userProfile.wishlist.includes(bookId)) {
    throw new Error('Book already exists in the wishlist');
  }

  userProfile.wishlist.push(bookId);
  await userProfile.save();
};
const GetWishlists = async (user: JwtPayload): Promise<string[]> => {
  const userProfile = await Users.findById(user._id).populate('wishlist');

  if (!userProfile) {
    throw new Error('User not found');
  }

  return userProfile.wishlist;
};

const RemoveFromWishlist = async (
  user: JwtPayload,
  bookId: string
): Promise<void> => {
  await Users.findOneAndUpdate(
    { _id: user._id },
    { $pull: { wishlist: bookId } },
    { new: true }
  );
};
const AddToReadingList = async (
  bookId: string,
  user: JwtPayload
): Promise<void> => {
  const { _id } = user;
  const userProfile = await Users.findById(_id);

  if (!userProfile) {
    throw new Error('User not found');
  }

  if (userProfile.readingList.includes(bookId)) {
    throw new Error('Book already exists in the Reading List');
  }

  const bookIndex = userProfile.wishlist.indexOf(bookId);
  if (bookIndex !== -1) {
    userProfile.wishlist.splice(bookIndex, 1);
  }

  userProfile.readingList.push(bookId);
  await userProfile.save();
};

const GetReadingLists = async (user: JwtPayload): Promise<string[]> => {
  const userProfile = await Users.findById(user._id).populate('readingList');

  if (!userProfile) {
    throw new Error('User not found');
  }
  console.log(userProfile);
  return userProfile.readingList;
};

const RemoveFromReadingList = async (
  user: JwtPayload,
  bookId: string
): Promise<void> => {
  await Users.findOneAndUpdate(
    { _id: user._id },
    { $pull: { readingList: bookId } },
    { new: true }
  );
};
const AddToFinishedBook = async (
  bookId: string,
  user: JwtPayload
): Promise<void> => {
  const { _id } = user;
  const userProfile = await Users.findById(_id);

  if (!userProfile) {
    throw new Error('User not found');
  }

  if (userProfile.finishedBooks.includes(bookId)) {
    throw new Error('Book already exists in the Finished Book List');
  }

  const bookIndex = userProfile.readingList.indexOf(bookId);
  if (bookIndex !== -1) {
    userProfile.readingList.splice(bookIndex, 1);
  }

  userProfile.finishedBooks.push(bookId);
  await userProfile.save();
};

const GetFinishedBooks = async (user: JwtPayload): Promise<string[]> => {
  const userProfile = await Users.findById(user._id).populate('finishedBooks');

  if (!userProfile) {
    throw new Error('User not found');
  }

  return userProfile.finishedBooks;
};

const RemoveFinishedBooks = async (
  user: JwtPayload,
  bookId: string
): Promise<void> => {
  await Users.findOneAndUpdate(
    { _id: user._id },
    { $pull: { finishedBooks: bookId } },
    { new: true }
  );
};
export const UserService = {
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  GetUserProfile,
  AddToWishlist,
  GetWishlists,
  RemoveFromWishlist,
  AddToReadingList,
  GetReadingLists,
  RemoveFromReadingList,
  AddToFinishedBook,
  GetFinishedBooks,
  RemoveFinishedBooks,
};
