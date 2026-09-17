import express from "express";
import "dotenv/config";

import AuthController from "./controllers/AuthController.js";
import { AppDataSource } from "./data-source.js";
import SituationsController from "./controllers/SituationsController.js";

const app = express();


app.use(express.json());

app.use("/", AuthController);
app.use("/", SituationsController);


AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado com sucesso!");

        app.listen(process.env.PORT, () => {
            console.log(
                `Server is running on port ${process.env.PORT}: http://localhost:${process.env.PORT}/`
            );
        });
    })
    .catch((error) => {
        console.error("Erro na conexão com o banco de dados!", error);
    });