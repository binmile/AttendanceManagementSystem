import { AttendanceModel } from "../models/AttendanceModel";

export const calculateMonthlySalary = (
  attendance: AttendanceModel[],
  monthSalary: number
): number => {
  const totalDaysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const presentDays = attendance.filter((entry) => entry.is_present).length;

  const attendancePercentage = (presentDays / totalDaysInMonth) * 100;

  const calculatedSalary = (attendancePercentage / 100) * monthSalary;

  return calculatedSalary;
};


