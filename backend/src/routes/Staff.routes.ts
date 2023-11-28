import express from "express";
import { StaffController } from "../controllers/StaffController";

const StaffRouter = express.Router();

StaffRouter.post("/", StaffController.createStaff);
StaffRouter.get("/:id", StaffController.getStaffById);
StaffRouter.get("/", StaffController.getAllStaffMembers);
StaffRouter.put("/:id", StaffController.updateStaff);
StaffRouter.delete("/:id", StaffController.deleteStaff);

export default StaffRouter;
