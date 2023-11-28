"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SalaryController_1 = require("../controllers/SalaryController");
const SalariesRouter = express_1.default.Router();
SalariesRouter.get("/:month/:year", SalaryController_1.SalaryController.getAllSalariesByMonthAndYear);
SalariesRouter.post("/", SalaryController_1.SalaryController.createSalary);
SalariesRouter.get("/:empId/:month/:year", SalaryController_1.SalaryController.getSalaryForEmployeeInMonth);
exports.default = SalariesRouter;
