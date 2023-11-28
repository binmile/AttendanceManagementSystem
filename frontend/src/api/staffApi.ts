import { StaffModel } from "../models/StaffModel";
import axiosInstance from "../utils/axiosInstance";

export const getAllStaff = async (): Promise<StaffModel[]> => {
  return axiosInstance.get("/api/staff").then((response) => response.data.data);
};

export const getStaffById = async (staffId: number): Promise<StaffModel> => {
  return axiosInstance
    .get(`/api/staff/${staffId}`)
    .then((response) => response.data);
};

export const addStaff = async (
  staffData: Partial<StaffModel>
): Promise<StaffModel> => {
  return axiosInstance
    .post("/api/staff", staffData)
    .then((response) => response.data);
};


