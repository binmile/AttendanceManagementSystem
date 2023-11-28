import { Request, Response } from "express";
import { StaffService } from "../services/StaffService";

export class StaffController {
  static async getAllStaffMembers(req: Request, res: Response) {
    try {
      const staffMembers = await StaffService.getAllStaffMembers();
      return res.json({ success: true, data: staffMembers });
    } catch (error) {
      console.error("Error fetching staff members:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

 static async getStaffById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const staffMember = await StaffService.getStaffById(parseInt(id, 10));

      if (staffMember) {
        return res.json({ success: true, data: staffMember });
      } else {
        return res
          .status(404)
          .json({ success: false, error: "Staff member not found" });
      }
    } catch (error) {
      console.error("Error fetching staff member:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

 static async createStaff(req: Request, res: Response) {
    try {
      const memberData = req.body;
      const newStaffMember = await StaffService.createStaff(memberData);
      return res.json({ success: true, data: newStaffMember });
    } catch (error) {
      console.error("Error creating staff member:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

  static async updateStaff(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const memberData = req.body;

      const affectedCount = await StaffService.updateStaff(
        parseInt(id, 10),
        memberData
      );

      if (affectedCount > 0) {
        return res.json({
          success: true,
          message: "Staff member updated successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, error: "Staff member not found" });
      }
    } catch (error) {
      console.error("Error updating staff member:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

 static async deleteStaff(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const affectedCount = await StaffService.deleteStaff(parseInt(id, 10));

      if (affectedCount > 0) {
        return res.json({
          success: true,
          message: "Staff member deleted successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, error: "Staff member not found" });
      }
    } catch (error) {
      console.error("Error deleting staff member:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
}
