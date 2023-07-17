import { sequelize } from '../database/models';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
