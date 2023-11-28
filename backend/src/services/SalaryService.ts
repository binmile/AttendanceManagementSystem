
import Salary from "../models/SalaryModel";

export class SalaryService {
  static async getAllSalariesByMonthAndYear(month: string, year: number): Promise<Salary[]> {
    try {
      const salaries = await Salary.findAll({
        where: {
          salary_month: month,
          salary_year: year,
        },
      });

      return salaries;
    } catch (error) {
      console.error('Error fetching salaries for month and year:', error);
      throw error; 
    }
  }

  static async getSalaryForEmployeeInMonth(empId: number, month: number, year: number): Promise<Salary | null> {
    try {
      const salary = await Salary.findOne({
        where: {
          emp_id: empId,
          salary_month: month,
          salary_year: year,
        },
      });

      return salary;
    } catch (error) {
      console.error('Error fetching salary record for employee in month:', error);
      throw error; 
    }
  }

  static async createSalary(salaryData: Partial<Salary>): Promise<Salary> {
    try {
      return Salary.create(salaryData);
    } catch (error) {
      console.error("Error creating salary record:", error);
      throw error; 
    }
  }
}
