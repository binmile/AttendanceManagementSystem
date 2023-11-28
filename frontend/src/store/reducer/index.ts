import { combineReducers, configureStore } from '@reduxjs/toolkit';
import attendanceReducer from '../slices/AttendanceSlice';
import staffReducer from '../slices/StaffSlice';

const rootReducer = combineReducers({
  attendance: attendanceReducer,
  staff: staffReducer
});

export const store = configureStore({reducer:rootReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
