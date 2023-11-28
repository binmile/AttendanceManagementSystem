import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Attendance extends Model {
  public staff_id!: number;
  public date!: Date;
  public is_present!: boolean;
}

Attendance.init(
  {
    
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    is_present: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Attendance',
    tableName: 'Attendances',
    indexes: [
      {
        unique: true,
        fields: ['staff_id', 'date'], 
        name: 'compositeIndex',
      },
    ],
  }
);

export default Attendance;
