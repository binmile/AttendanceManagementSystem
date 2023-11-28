import { AttendanceModel } from "../models/AttendanceModel";
import { StaffModel } from "../models/StaffModel";
import { getMonthAndYearForCalendarDate } from "./common";

export const aggregateAttendanceByDate = (
  attendance: AttendanceModel[]
): Record<string, AttendanceModel[]> => {
  const attendanceByDate: Record<string, AttendanceModel[]> = {};

  attendance.forEach((entry) => {
    const dateKey = entry.date;

    if (!attendanceByDate[dateKey]) {
      attendanceByDate[dateKey] = [];
    }

    attendanceByDate[dateKey].push(entry);
  });

  return attendanceByDate;
};

export const aggregateAttendanceByStaffAndMonth = (
  attendance: AttendanceModel[]
): Record<number, Record<string, AttendanceModel[]>> => {
  const attendanceByStaffAndMonth: Record<
    number,
    Record<string, AttendanceModel[]>
  > = {};

  attendance.forEach((entry) => {
    const staffId = entry.staff_id;
    const date = getMonthAndYearForCalendarDate(entry.date);
    const monthYearKey = `${date.year}-${date.month}`;

    if (!attendanceByStaffAndMonth[staffId]) {
      attendanceByStaffAndMonth[staffId] = {};
    }

    if (!attendanceByStaffAndMonth[staffId][monthYearKey]) {
      attendanceByStaffAndMonth[staffId][monthYearKey] = [];
    }

    attendanceByStaffAndMonth[staffId][monthYearKey].push(entry);
  });

  return attendanceByStaffAndMonth;
};

export const aggregateStaffAttendanceDate = (
  attendanceData: AttendanceModel[],
  staffData: StaffModel[],
  date: string
): Array<{
  staff_id: number;
  name: string;
  is_present: boolean;
  date: string;
}> => {
  return staffData.map((staff) => {
    const staffId = staff.id;
    const staffName = staff.name;
    const staffAttendance = attendanceData
      .find((attendance) => attendance.staff_id === staffId);

    const aggregatedAttendance = staffAttendance
      ? {
          staff_id: staffId,
          name: staffName,
          date: staffAttendance.date,
          is_present: staffAttendance.is_present,
        }
      : {
          staff_id: staffId,
          name: staffName,
          date,
          is_present: false,
        };

    return aggregatedAttendance;
  });
};
