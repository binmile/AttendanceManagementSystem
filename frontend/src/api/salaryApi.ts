import { SalaryModel } from "../models/SalaryModel";
import axiosInstance from "../utils/axiosInstance";



export const saveCalculateAndSaveSalary = (salaryData:SalaryModel) => {
  return axiosInstance.post("/api/salaries", salaryData);
};

export const getSalaryByMonth = (month:string, year:string) => {
  return axiosInstance.get(`/api/salaries/${month}/${year}`);
};

export const getStaffSalaryByMonth = (staffId:string, month:string, year:string) => {
  return axiosInstance.get(`/api/salaries/${staffId}/${month}/${year}`);
};
