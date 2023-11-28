import { Request, Response } from "express";
import { SalaryService } from "../services/SalaryService";

export class SalaryController {
  static async getAllSalariesByMonthAndYear(req: Request, res: Response) {
    try {
      const { month, year } = req.params;
      const salaries = await SalaryService.getAllSalariesByMonthAndYear(month, parseInt(year, 10));

      return res.json({ success: true, data: salaries });
    } catch (error) {
      console.error('Error fetching salaries for month and year:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  static async getSalaryForEmployeeInMonth(req: Request, res: Response) {
    try {
      const empId = parseInt(req.params.empId, 10);
      const month = parseInt(req.params.month, 10);
      const year = parseInt(req.params.year, 10);
      const salary = await SalaryService.getSalaryForEmployeeInMonth(
        empId,
        month,
        year
      );

      if (salary) {
        return res.json({ success: true, data: salary });
      } else {
        return res
          .status(404)
          .json({ success: false, error: "Salary not found" });
      }
    } catch (error) {
      console.error("Error fetching salary by employee ID:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

  static async createSalary(req: Request, res: Response) {
    try {
      const salaryData = req.body; 
      const createdSalary = await SalaryService.createSalary(salaryData);

      return res.json({ success: true, data: createdSalary });
    } catch (error) {
      console.error("Error creating salary record:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
}
