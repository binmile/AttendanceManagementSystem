import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root@123',
  database: 'AttendanceManagement',
});

export default sequelize;
