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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const AttendanceService_1 = require("../services/AttendanceService");
class AttendanceController {
    static createAndUpdateAttendanceBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendanceDataArray = req.body;
                const updatedOrCreatedAttendances = yield AttendanceService_1.AttendanceService.createAndUpdateAttendanceBatch(attendanceDataArray);
                return res.json({ success: true, data: updatedOrCreatedAttendances });
            }
            catch (error) {
                console.error("Error creating/updating attendance records in batch:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    static getAttendanceForStaffInMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { staffId, month, year } = req.params;
                const attendance = yield AttendanceService_1.AttendanceService.getAttendanceForStaffInMonth(parseInt(staffId, 10), month, parseInt(year, 10));
                return res.json({ success: true, data: attendance });
            }
            catch (error) {
                console.error("Error fetching attendance records for staff in month:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    static getAttendanceInMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { month, year } = req.params;
                const attendance = yield AttendanceService_1.AttendanceService.getAttendanceInMonth(month, parseInt(year, 10));
                return res.json({ success: true, data: attendance });
            }
            catch (error) {
                console.error("Error fetching attendance records for staff in month:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    static getAttendanceCountByStaffAndMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { month, year } = req.params;
                const attendanceCounts = yield AttendanceService_1.AttendanceService.getAttendanceCountByStaffAndMonth(month, parseInt(year, 10));
                return res.json({ success: true, data: attendanceCounts });
            }
            catch (error) {
                console.error('Error fetching attendance count by staff and month:', error);
                return res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
        });
    }
}
exports.AttendanceController = AttendanceController;
