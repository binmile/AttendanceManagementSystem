"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/attendanceRoutes.ts
const express_1 = __importDefault(require("express"));
const AttendanceController_1 = require("../controllers/AttendanceController");
const AttendanceRouter = express_1.default.Router();
AttendanceRouter.post('/', AttendanceController_1.AttendanceController.createAndUpdateAttendanceBatch);
AttendanceRouter.get('/:staffId/:month/:year', AttendanceController_1.AttendanceController.getAttendanceForStaffInMonth);
AttendanceRouter.get('/:month/:year', AttendanceController_1.AttendanceController.getAttendanceInMonth);
AttendanceRouter.get('/count/:month/:year', AttendanceController_1.AttendanceController.getAttendanceCountByStaffAndMonth);
exports.default = AttendanceRouter;
