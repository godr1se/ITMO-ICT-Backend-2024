import sequelize from "./configs/db";
import express from "express";
import bodyParser from 'body-parser';
import router from "../src/routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const port = process.env.PORT || 8000;

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log("Сервер ожидает подключения...");
            console.log(`http://localhost:${port}`);
        });
    })
    .catch(err => console.log("Ошибка подключения к базе данных:", err));
