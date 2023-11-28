import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  aggregateAttendanceByDate,
  aggregateStaffAttendanceDate,
} from "../function/attendanceFunction";
import {
  getAttendanceByMonth,
  markOrEditAttendance,
} from "../api/attendanceApi";
import { getMonthAndYearForCalendarDate } from "../function/common";
import { setAttendanceData } from "../store/slices/AttendanceSlice";
import { AttendanceModel } from "../models/AttendanceModel";
import { capitalize } from "lodash";

const HomePage = () => {
  const dispatch = useDispatch();

  const [currentCalendarDate, setCalendarDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const attendance = useSelector(
    (app: RootState) => app.attendance[currentCalendarDate] ?? []
  );

  const allStaff = Object.values(useSelector((app: RootState) => app.staff));

  const attendanceList = useMemo(
    () =>
      aggregateStaffAttendanceDate(attendance, allStaff, currentCalendarDate),
    [allStaff, attendance, currentCalendarDate]
  );

  const [attendanceData, setAttendanceDataDisplay] = useState(attendanceList);

  useEffect(() => {
    if (attendanceData.length === 0) {
      setAttendanceDataDisplay(attendanceList);
    }
  }, [attendanceData.length, attendanceList]);

  const loadAttendanceData =useCallback(()=>{
    const { month, year } = getMonthAndYearForCalendarDate(currentCalendarDate);
    getAttendanceByMonth(month, year)
      .then((data) => aggregateAttendanceByDate(data.data))
      .then((aggregatedData) => {
        Object.entries(aggregatedData).forEach((entry) => {
          dispatch(setAttendanceData({ date: entry[0], data: entry[1] }));
        });
      });
    setAttendanceDataDisplay([]);
  },[currentCalendarDate, dispatch])

  useEffect(() => {
    loadAttendanceData();
  },[loadAttendanceData]);

  const handleCheckboxChange = (staffId: number, isChecked: boolean) => {
    setAttendanceDataDisplay((prevAttendance) =>
      prevAttendance.map((curr) =>
        curr.staff_id === staffId ? { ...curr, is_present: isChecked } : curr
      )
    );
  };
  const markAttendance = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      markOrEditAttendance(
        attendanceData.map((item): AttendanceModel => {
          return {
            date: item.date,
            is_present: item.is_present,
            staff_id: item.staff_id,
          };
        })
      );
    },
    [attendanceData]
  );
  return (
    <div>
      <form className="flex flex-col p-2">
        <div className="flex justify-between p-4">
          <input
            type="date"
            className="border-[1px] rounded-md border-solid border-black p-2"
            value={currentCalendarDate}
            onChange={(e) => {
              setCalendarDate(e.target.value);
              setAttendanceDataDisplay([]);
            }}
          />
          <button
            className="text-green-500 border-[1px] border-solid p-2 rounded-md hover:bg-green-100"
            onClick={markAttendance}
          >
            Save
          </button>
        </div>

          <table className="min-w-full border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-6 px-20 border-b">Staff ID</th>
                <th className="py-6 px-20 border-b">Name</th>
                <th className="py-6 px-20 border-b">Mark Present</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item) => (
                <tr key={item.staff_id} className="hover:bg-gray-50">
                  <td className="py-6 px-20 border-b">{item.staff_id}</td>
                  <td className="py-6 px-20 border-b">{capitalize(item.name)}</td>
                  <td className="py-6 px-20 border-b">
                    <input
                      type="checkbox"
                      checked={item.is_present}
                      onChange={(e) => {
                        handleCheckboxChange(item.staff_id, e.target.checked);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </form>
    </div>
  );
};

export default HomePage;
