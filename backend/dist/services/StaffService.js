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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const StaffModel_1 = __importDefault(require("../models/StaffModel"));
class StaffService {
    static getAllStaffMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            return StaffModel_1.default.findAll();
        });
    }
    static getStaffById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return StaffModel_1.default.findByPk(id);
        });
    }
    static createStaff(memberData) {
        return __awaiter(this, void 0, void 0, function* () {
            return StaffModel_1.default.create(memberData);
        });
    }
    static updateStaff(id, memberData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedCount] = yield StaffModel_1.default.update(memberData, { where: { id } });
            return affectedCount;
        });
    }
    static deleteStaff(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return StaffModel_1.default.destroy({ where: { id } });
        });
    }
}
exports.StaffService = StaffService;
