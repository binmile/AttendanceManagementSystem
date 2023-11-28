import { SalaryModel } from '../models/SalaryModel';

export const aggregateSalaryByMonth = (salaries: SalaryModel[]): Record<string, Record<number, number>> => {
  const salaryByMonth: Record<string, Record<number, number>> = {};

  salaries.forEach(entry => {
    const monthYearKey = `${entry.salary_year}-${entry.salary_month}`;

    if (!salaryByMonth[monthYearKey]) {
      salaryByMonth[monthYearKey] = {};
    }

    salaryByMonth[monthYearKey][entry.emp_id] = entry.calculated_salary;
  });

  return salaryByMonth;
};
