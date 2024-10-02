import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import sequelize from "./connection/db";
import { getId } from "./middelwaers/auth";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/users", getId, userRoutes);

const port = process.env.PORT || 8000;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("Сервер запущен на http://localhost:${port}");
    });
  })
  .catch((err: Error) => console.error("Ошибка подключения к БД:", err));
