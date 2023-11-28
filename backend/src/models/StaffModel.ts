import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Staff extends Model {
  public id!: number;
  public name!: string;
  public salary!: number;
}

Staff.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Staff',
    tableName: 'Staffs'
  }
);

export default Staff;
