import Attendance from "../models/AttendanceModel";
import { Op } from "sequelize";
import sequelize from "../sequelize";

export class AttendanceService {
  static async createAndUpdateAttendanceBatch(
    attendanceDataArray: Partial<Attendance>[]
  ): Promise<void> {
    await Promise.all(
      attendanceDataArray.map(async (attendanceData) => {
        return Attendance.upsert(attendanceData);
      })
    );
  }

  static async getAttendanceForStaffInMonth(
    staffId: number,
    month: string,
    year: number
  ): Promise<Attendance[]> {
    const lastDayOfMonth = new Date(year, parseInt(month, 10), 0).getDate();
    return Attendance.findAll({
      where: {
        staff_id: staffId,
        date: {
          [Op.between]: [
            `${year}-${month}-01`,
            `${year}-${month}-${lastDayOfMonth}`,
          ],
        },
      },
    });
  }

  static async getAttendanceInMonth(month: string, year: number) {
    const lastDayOfMonth = new Date(year, parseInt(month, 10), 0).getDate();
    return Attendance.findAll({
      where: {
        date: {
          [Op.between]: [
            `${year}-${month}-01`,
            `${year}-${month}-${lastDayOfMonth}`,
          ],
        },
      },
    });
  }

  static async getAttendanceCountByStaffAndMonth(
    month: string,
    year: number
  ): Promise<
    {
      staffId: number;
      name: string;
      salary: number;
      absentCount: number;
      presentCount: number;
    }[]
  > {
    try {
      const lastDayOfMonth = new Date(year, parseInt(month, 10), 0).getDate();

      const attendanceCounts = await sequelize.query(`SELECT
      S.id,
      S.name,
      S.salary,
      A.is_present,
      COUNT(*) as attendance_count,
      SL.id as salary_id
    FROM
      Staffs AS S
    LEFT JOIN
      (SELECT * FROM Attendances WHERE date BETWEEN Date('${year}-${month}-01') AND Date('${year}-${month}-${lastDayOfMonth}')) AS A
    ON
      S.id = A.staff_id
    LEFT JOIN
      (SELECT * FROM Salaries WHERE salary_month = ${month} AND salary_year = ${year}) AS SL
    ON
      S.id = SL.emp_id
    GROUP BY
      S.id, S.name, A.is_present, SL.id, S.salary;    
    `);

      const result: {
        staffId: number;
        name: string;
        salary: number;
        absentCount: number;
        presentCount: number;
        isCalculated: boolean;
      }[] = [];

      attendanceCounts[0].forEach((record: any) => {
        const staffId = record.id;
        const count = record.attendance_count;
        const status =
          record.is_present != null
            ? record.is_present == 0
              ? "absent"
              : "present"
            : "N/A";
        const name = record.name;
        const salary = record.salary;
        const existingRecord = result.find((r) => r.staffId === staffId);

        if (existingRecord) {
          if (status === "absent") {
            existingRecord.absentCount += count;
          } else if (status === "present") {
            existingRecord.presentCount += count;
          }
        } else {
          result.push({
            staffId,
            name,
            salary,
            absentCount: status === "absent" ? count : 0,
            presentCount: status === "present" ? count : 0,
            isCalculated: record.salary_id !== null
          });
        }
      });

      return result;
    } catch (error) {
      console.error(
        "Error fetching attendance count by staff and month:",
        error
      );
      throw error;
    }
  }
}
