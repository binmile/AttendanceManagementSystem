import express from "express";
import { SalaryController } from "../controllers/SalaryController";

const SalariesRouter = express.Router();

SalariesRouter.post("/", SalaryController.createSalary);
SalariesRouter.get("/:month/:year", SalaryController.getAllSalariesByMonthAndYear);
SalariesRouter.get("/:empId/:month/:year",SalaryController.getSalaryForEmployeeInMonth);

export default SalariesRouter;
