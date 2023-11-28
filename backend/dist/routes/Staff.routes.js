"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StaffController_1 = require("../controllers/StaffController");
const StaffRouter = express_1.default.Router();
StaffRouter.post("/", StaffController_1.StaffController.createStaff);
StaffRouter.get("/:id", StaffController_1.StaffController.getStaffById);
StaffRouter.get("/", StaffController_1.StaffController.getAllStaffMembers);
StaffRouter.put("/:id", StaffController_1.StaffController.updateStaff);
StaffRouter.delete("/:id", StaffController_1.StaffController.deleteStaff);
exports.default = StaffRouter;
