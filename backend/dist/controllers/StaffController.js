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
exports.StaffController = void 0;
const StaffService_1 = require("../services/StaffService");
class StaffController {
    static getAllStaffMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffMembers = yield StaffService_1.StaffService.getAllStaffMembers();
                return res.json({ success: true, data: staffMembers });
            }
            catch (error) {
                console.error("Error fetching staff members:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    static getStaffById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const staffMember = yield StaffService_1.StaffService.getStaffById(parseInt(id, 10));
                if (staffMember) {
                    return res.json({ success: true, data: staffMember });
                }
                else {
                    return res
                        .status(404)
                        .json({ success: false, error: "Staff member not found" });
                }
            }
            catch (error) {
                console.error("Error fetching staff member:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    static createStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memberData = req.body;
                const newStaffMember = yield StaffService_1.StaffService.createStaff(memberData);
                return res.json({ success: true, data: newStaffMember });
            }
            catch (error) {
                console.error("Error creating staff member:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    static updateStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const memberData = req.body;
                const affectedCount = yield StaffService_1.StaffService.updateStaff(parseInt(id, 10), memberData);
                if (affectedCount > 0) {
                    return res.json({
                        success: true,
                        message: "Staff member updated successfully",
                    });
                }
                else {
                    return res
                        .status(404)
                        .json({ success: false, error: "Staff member not found" });
                }
            }
            catch (error) {
                console.error("Error updating staff member:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    static deleteStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const affectedCount = yield StaffService_1.StaffService.deleteStaff(parseInt(id, 10));
                if (affectedCount > 0) {
                    return res.json({
                        success: true,
                        message: "Staff member deleted successfully",
                    });
                }
                else {
                    return res
                        .status(404)
                        .json({ success: false, error: "Staff member not found" });
                }
            }
            catch (error) {
                console.error("Error deleting staff member:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
}
exports.StaffController = StaffController;
