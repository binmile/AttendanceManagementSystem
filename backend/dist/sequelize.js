"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root@123',
    database: 'AttendanceManagement',
});
exports.default = sequelize;
