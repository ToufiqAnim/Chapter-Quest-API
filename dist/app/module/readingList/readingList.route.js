"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const readingList_controller_1 = require("./readingList.controller");
const readingList_validation_1 = require("./readingList.validation");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.validateRequest)(readingList_validation_1.ReadingListValidation.createReadingListZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), readingList_controller_1.ReadingListController.createReadingListController);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), readingList_controller_1.ReadingListController.getReadingListController);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), readingList_controller_1.ReadingListController.updateReadingListStatusController);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), readingList_controller_1.ReadingListController.deleteReadingListController);
exports.ReadingListRoutes = router;
