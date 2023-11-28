import { useCallback, useEffect, useState } from "react";
import { getMonthAndYearForCalendarDate } from "../function/common";
import { getAttendanceCountByMonth } from "../api/attendanceApi";
import StaffTable, { StaffData } from "../components/StaffTable";
import { parseInt } from "lodash";

export const ReportPage = () => {
  const todayDate = new Date().toISOString().slice(0, 7);
  const [currentMonthYear, setCurrentMonthYear] = useState(todayDate);
  const [tableData, setTableData] = useState<StaffData>([]);

  const disable = () => {
    const [year1, month1] = currentMonthYear.split("-").map(Number);
    const [year2, month2] = todayDate.split("-").map(Number);

    if (year1 > year2 || (year1 === year2 && month1 >= month2)) {
      return true;
    } else {
      return false;
    }
  };

  const getAndSetData = useCallback(() => {
    if (currentMonthYear.length === 0) return;
    const { month, year } = getMonthAndYearForCalendarDate(currentMonthYear);
    getAttendanceCountByMonth(month, year).then((data) => {
      setTableData(data.data);
    });
  }, [currentMonthYear]);

  useEffect(() => {
    getAndSetData();
  }, [getAndSetData]);
  function getDaysInMonth(date: string) {
    const { month, year } = getMonthAndYearForCalendarDate(date);
    const firstDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const lastDay = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth() + 1,
      0
    );
    return lastDay.getDate();
  }

  return (
    <div className="flex justify-center items-center">
      <form className="flex gap-2 flex-col">
        <div>
          <input
            type="month"
            name=""
            className="border-[1px] border-solid p-2 rounded-md"
            value={currentMonthYear}
            onChange={(e) => setCurrentMonthYear(e.target.value)}
          />
        </div>
        <StaffTable
          disable={disable()}
          staffData={tableData}
          days={getDaysInMonth(currentMonthYear)}
          {...getMonthAndYearForCalendarDate(currentMonthYear)}
          change={getAndSetData}
        />
      </form>
    </div>
  );
};
