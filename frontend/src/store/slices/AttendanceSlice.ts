import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttendanceModel } from '../../models/AttendanceModel';



interface AttendanceState {
  [date: string]: AttendanceModel[];
}

const initialState: AttendanceState = {};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceData: (state, action: PayloadAction<{ date: string; data: AttendanceModel[] }>) => {
      const { date, data } = action.payload;
      state[date] = data;
    },
  },
});

export const { setAttendanceData } = attendanceSlice.actions;
export default attendanceSlice.reducer;
