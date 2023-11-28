// src/routes/attendanceRoutes.ts
import express from 'express';
import { AttendanceController } from '../controllers/AttendanceController';

const AttendanceRouter = express.Router();

AttendanceRouter.post('/', AttendanceController.createAndUpdateAttendanceBatch);
AttendanceRouter.get('/count/:month/:year', AttendanceController.getAttendanceCountByStaffAndMonth);
AttendanceRouter.get('/:staffId/:month/:year', AttendanceController.getAttendanceForStaffInMonth);
AttendanceRouter.get('/:month/:year', AttendanceController.getAttendanceInMonth);

export default AttendanceRouter;
