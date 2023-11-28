"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class Attendance extends sequelize_1.Model {
}
Attendance.init({
    staff_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    is_present: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Attendance',
    tableName: 'Attendances',
    indexes: [
        {
            unique: true,
            fields: ['staff_id', 'date'],
            name: 'compositeIndex',
        },
    ],
});
exports.default = Attendance;
