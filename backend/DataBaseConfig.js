import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('side-project', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
//relations for the database


export default sequelize;
