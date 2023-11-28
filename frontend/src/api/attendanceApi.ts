
import { AttendanceModel } from '../models/AttendanceModel';
import axiosInstance from '../utils/axiosInstance';

export const markOrEditAttendance = (attendanceData:AttendanceModel[]) => {
  return axiosInstance.post('/api/attendance', attendanceData);
};

export const getAttendanceByMonth = (month:string, year:string) => {
  return axiosInstance.get(`/api/attendance/${month}/${year}`).then(res=>res.data);
};

export const getStaffAttendanceByMonth = (staffId:string, month:string, year:string) => {
  return axiosInstance.get(`/api/attendance/${staffId}/${month}/${year}`);
};

export const getAttendanceCountByMonth = (month:string, year:string) => {
  return axiosInstance.get(`/api/attendance/count/${month}/${year}`).then(res=>res.data);
};