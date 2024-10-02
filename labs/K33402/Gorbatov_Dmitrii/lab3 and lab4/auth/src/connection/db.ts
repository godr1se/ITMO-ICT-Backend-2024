import { Sequelize } from "sequelize-typescript";
import User from "../models/users";


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/models/models.db'
});

const models: any = [User];
sequelize.addModels(models);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established successfully.');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
};

testConnection();

export default sequelize;
