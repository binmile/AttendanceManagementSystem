"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Attendance_routes_1 = __importDefault(require("./Attendance.routes"));
const Salary_routes_1 = __importDefault(require("./Salary.routes"));
const Staff_routes_1 = __importDefault(require("./Staff.routes")); // Import staffRoutes
const router = express_1.default.Router();
// Use Attendance routes
router.use('/attendance', Attendance_routes_1.default);
// Use Salary routes
router.use('/salaries', Salary_routes_1.default);
// Use Staff routes
router.use('/staff', Staff_routes_1.default);
exports.default = router;
