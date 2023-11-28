import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Salary extends Model {
  public emp_id!: number;
  public salary_month!: number;
  public salary_year!: number;
  public calculated_salary!: number;
}

Salary.init(
  {
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calculated_salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { 
    indexes: [
    {
      unique: true,
      fields: ['emp_id', 'salary_month','salary_year'], 
      name: 'compositeIndexSalary',
    },
  ],
    sequelize,
    modelName: 'Salary',
    tableName: 'Salaries'
  }
);

export default Salary;
