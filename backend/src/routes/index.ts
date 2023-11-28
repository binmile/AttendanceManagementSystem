import express from 'express';
import attendanceRoutes from './Attendance.routes';
import salaryRoutes from './Salary.routes';
import staffRoutes from './Staff.routes'; // Import staffRoutes

const router = express.Router();

// Use Attendance routes
router.use('/attendance', attendanceRoutes);

// Use Salary routes
router.use('/salaries', salaryRoutes);

// Use Staff routes
router.use('/staff', staffRoutes);

export default router;