import { Request, Response } from "express";
import { AttendanceService } from "../services/AttendanceService";

export class AttendanceController {
  static async createAndUpdateAttendanceBatch(req: Request, res: Response) {
    try {
      const attendanceDataArray = req.body;
      const updatedOrCreatedAttendances =
        await AttendanceService.createAndUpdateAttendanceBatch(
          attendanceDataArray
        );

      return res.json({ success: true, data: updatedOrCreatedAttendances });
    } catch (error) {
      console.error(
        "Error creating/updating attendance records in batch:",
        error
      );
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

  static async getAttendanceForStaffInMonth(req: Request, res: Response) {
    try {
      const { staffId, month, year } = req.params;
      const attendance = await AttendanceService.getAttendanceForStaffInMonth(
        parseInt(staffId, 10),
        month,
        parseInt(year, 10)
      );

      return res.json({ success: true, data: attendance });
    } catch (error) {
      console.error(
        "Error fetching attendance records for staff in month:",
        error
      );
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

  static async getAttendanceInMonth(req: Request, res: Response) {
    try {
      const {  month, year } = req.params;
      const attendance = await AttendanceService.getAttendanceInMonth(
        month,
        parseInt(year, 10)
      );

      return res.json({ success: true, data: attendance });
    } catch (error) {
      console.error(
        "Error fetching attendance records for staff in month:",
        error
      );
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

  static async getAttendanceCountByStaffAndMonth(req: Request, res: Response) {
    try {
      const { month, year } = req.params;
      const attendanceCounts = await AttendanceService.getAttendanceCountByStaffAndMonth(month, parseInt(year, 10));

      return res.json({ success: true, data: attendanceCounts });
    } catch (error) {
      console.error('Error fetching attendance count by staff and month:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
}
