import Staff from '../models/StaffModel';

export class StaffService {
  static async getAllStaffMembers(): Promise<Staff[]> {
    return Staff.findAll();
  }

  static async getStaffById(id: number): Promise<Staff | null> {
    return Staff.findByPk(id);
  }

  static async createStaff(memberData: Partial<Staff>): Promise<Staff> {
    return Staff.create(memberData);
  }

  static async updateStaff(id: number, memberData: Partial<Staff>): Promise<number> {
    const [affectedCount] = await Staff.update(memberData, { where: { id } });
    return affectedCount;
  }

  static async deleteStaff(id: number): Promise<number> {
    return Staff.destroy({ where: { id } });
  }
}
