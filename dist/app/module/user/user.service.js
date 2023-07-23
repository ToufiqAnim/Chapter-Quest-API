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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
// user SECTION
const GetAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.Users.find();
    if (!allUsers) {
        throw new Error("No user found!");
    }
    return allUsers;
});
const GetUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.Users.findById(id);
    if (!user) {
        throw new Error("No user found!");
    }
    return user;
});
const UpdateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload, updatePayload = __rest(payload, ["email"]);
    const user = yield user_model_1.Users.findById(id);
    if (!user) {
        throw new Error("No user found!");
    }
    if (email && email !== user.email) {
        throw new Error("Updating email is not allowed!");
    }
    Object.assign(user, updatePayload);
    const updateduser = yield user.save();
    return updateduser;
});
const DeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteduser = yield user_model_1.Users.findByIdAndDelete(id);
    if (!deleteduser) {
        throw new Error("No user found!");
    }
});
const GetUserProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const userProfile = yield user_model_1.Users.findById(_id).exec();
    return userProfile;
});
const AddToWishlist = (bookId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const userProfile = yield user_model_1.Users.findById(_id);
    if (!userProfile) {
        throw new Error("User not found");
    }
    if (userProfile.wishlist.includes(bookId)) {
        throw new Error("Book already exists in the wishlist");
    }
    userProfile.wishlist.push(bookId);
    yield userProfile.save();
});
const GetWishlists = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield user_model_1.Users.findById(user._id).populate("wishlist");
    if (!userProfile) {
        throw new Error("User not found");
    }
    return userProfile.wishlist;
});
const RemoveFromWishlist = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.Users.findOneAndUpdate({ _id: user._id }, { $pull: { wishlist: bookId } }, { new: true });
});
const AddToReadingList = (bookId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const userProfile = yield user_model_1.Users.findById(_id);
    if (!userProfile) {
        throw new Error("User not found");
    }
    if (userProfile.readingList.includes(bookId)) {
        throw new Error("Book already exists in the Reading List");
    }
    const bookIndex = userProfile.wishlist.indexOf(bookId);
    if (bookIndex !== -1) {
        userProfile.wishlist.splice(bookIndex, 1);
    }
    userProfile.readingList.push(bookId);
    yield userProfile.save();
});
const GetReadingLists = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield user_model_1.Users.findById(user._id).populate("readingList");
    if (!userProfile) {
        throw new Error("User not found");
    }
    return userProfile.readingList;
});
const RemoveFromReadingList = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.Users.findOneAndUpdate({ _id: user._id }, { $pull: { readingList: bookId } }, { new: true });
});
exports.UserService = {
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
};
