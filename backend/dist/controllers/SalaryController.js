"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryController = void 0;
const SalaryService_1 = require("../services/SalaryService");
class SalaryController {
    static getAllSalariesByMonthAndYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { month, year } = req.params;
                const salaries = yield SalaryService_1.SalaryService.getAllSalariesByMonthAndYear(month, parseInt(year, 10));
                return res.json({ success: true, data: salaries });
            }
            catch (error) {
                console.error('Error fetching salaries for month and year:', error);
                return res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
        });
    }
    static getSalaryForEmployeeInMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empId = parseInt(req.params.empId, 10);
                const month = parseInt(req.params.month, 10);
                const year = parseInt(req.params.year, 10);
                const salary = yield SalaryService_1.SalaryService.getSalaryForEmployeeInMonth(empId, month, year);
                if (salary) {
                    return res.json({ success: true, data: salary });
                }
                else {
                    return res
                        .status(404)
                        .json({ success: false, error: "Salary not found" });
                }
            }
            catch (error) {
                console.error("Error fetching salary by employee ID:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    static createSalary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salaryData = req.body;
                const createdSalary = yield SalaryService_1.SalaryService.createSalary(salaryData);
                return res.json({ success: true, data: createdSalary });
            }
            catch (error) {
                console.error("Error creating salary record:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
}
exports.SalaryController = SalaryController;
