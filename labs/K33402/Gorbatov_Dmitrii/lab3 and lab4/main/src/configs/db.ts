import { Sequelize } from "sequelize-typescript";
import Currency from "../models/currency";
import Basket from "../models/balance";
import History from "../models/history";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/models/models.db',
});

const models = [Currency, Basket, History];
sequelize.addModels(models);

const syncModels = async () => {
    try {
        await Currency.sync();
        console.log('Таблица Currency успешно синхронизирована');
    } catch (err) {
        console.error('Ошибка при синхронизации таблицы Currency:', err);
    }
};

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение установлено успешно');
    } catch (err) {
        console.error('Ошибка подключения к базе данных:', err);
    }
};

syncModels();
testConnection();

export default sequelize;
