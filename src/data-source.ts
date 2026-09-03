import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Situation } from "./entities/Situation.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [User, Situation],
    subscribers: [],
    migrations: [],
});