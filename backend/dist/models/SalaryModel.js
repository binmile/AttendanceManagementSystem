"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class Salary extends sequelize_1.Model {
}
Salary.init({
    emp_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    salary_month: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    salary_year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    calculated_salary: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Salary',
    tableName: 'Salaries'
});
exports.default = Salary;
