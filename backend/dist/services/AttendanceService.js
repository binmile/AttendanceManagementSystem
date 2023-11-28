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
exports.AttendanceService = void 0;
const AttendanceModel_1 = __importDefault(require("../models/AttendanceModel"));
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class AttendanceService {
    static createAndUpdateAttendanceBatch(attendanceDataArray) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(attendanceDataArray.map((attendanceData) => __awaiter(this, void 0, void 0, function* () {
                return AttendanceModel_1.default.upsert(attendanceData);
            })));
        });
    }
    static getAttendanceForStaffInMonth(staffId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastDayOfMonth = new Date(year, parseInt(month, 10), 0).getDate();
            return AttendanceModel_1.default.findAll({
                where: {
                    staff_id: staffId,
                    date: {
                        [sequelize_1.Op.between]: [`${year}-${month}-01`, `${year}-${month}-${lastDayOfMonth}`],
                    },
                },
            });
        });
    }
    static getAttendanceInMonth(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastDayOfMonth = new Date(year, parseInt(month, 10), 0).getDate();
            return AttendanceModel_1.default.findAll({
                where: {
                    date: {
                        [sequelize_1.Op.between]: [`${year}-${month}-01`, `${year}-${month}-${lastDayOfMonth}`],
                    },
                },
            });
        });
    }
    static getAttendanceCountByStaffAndMonth(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lastDayOfMonth = new Date(year, parseInt(month, 10), 0).getDate();
                const attendanceCounts = yield AttendanceModel_1.default.findAll({
                    attributes: [
                        'staff_id',
                        [
                            sequelize_2.default.fn('COUNT', sequelize_2.default.col('is_present')),
                            'count',
                        ],
                        'is_present'
                    ],
                    where: {
                        date: {
                            [sequelize_1.Op.between]: [`${year}-${month}-01`, `${year}-${month}-${lastDayOfMonth}`],
                        },
                    },
                    group: ['staff_id', 'is_present'],
                    raw: true,
                });
                const result = [];
                attendanceCounts.forEach((record) => {
                    const staffId = record.staff_id;
                    const count = record.count;
                    const status = record.is_present == 0 ? 'absent' : 'present';
                    const existingRecord = result.find((r) => r.staffId === staffId);
                    if (existingRecord) {
                        if (status === 'absent') {
                            existingRecord.absentCount += count;
                        }
                        else if (status === 'present') {
                            existingRecord.presentCount += count;
                        }
                    }
                    else {
                        result.push({
                            staffId,
                            absentCount: status === 'absent' ? count : 0,
                            presentCount: status === 'present' ? count : 0,
                        });
                    }
                });
                return result;
            }
            catch (error) {
                console.error('Error fetching attendance count by staff and month:', error);
                throw error;
            }
        });
    }
}
exports.AttendanceService = AttendanceService;
