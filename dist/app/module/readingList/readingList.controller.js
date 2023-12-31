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
exports.ReadingListController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const readingList_service_1 = require("./readingList.service");
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResonse_1 = require("../../../shared/sendResonse");
const createReadingListController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readingList = req.body;
    const result = yield readingList_service_1.ReadingListService.createReadingList(readingList);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reading List created successfully',
        data: result,
    });
}));
const getReadingListController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readingList_service_1.ReadingListService.getReadingList();
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reading List retrieved successfully',
        data: result,
    });
}));
const updateReadingListStatusController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield readingList_service_1.ReadingListService.updateReadingListStatus(id);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reading List updated successfully',
        data: result,
    });
}));
const deleteReadingListController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield readingList_service_1.ReadingListService.deleteReadingList(id);
    (0, sendResonse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reading List deleted successfully',
        data: result,
    });
}));
exports.ReadingListController = {
    createReadingListController,
    getReadingListController,
    updateReadingListStatusController,
    deleteReadingListController,
};
