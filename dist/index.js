import express from "express";
import "dotenv/config";
import TestConnectionController from "./controllers/TestConnectionController.js";
import AuthController from "./controllers/AuthController.js";
import UsersController from "./controllers/UsersController.js";
import { AppDataSource } from "./data-source.js";
import SituationsController from "./controllers/SituationsController.js";
import ProductCategoriesController from "./controllers/ProductCategoriesController.js";
import ProductSituationsController from "./controllers/ProductSituationsController.js";
import ProductsController from "./controllers/ProductsController.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", TestConnectionController);
app.use("/", AuthController);
app.use("/", UsersController);
app.use("/", SituationsController);
app.use("/", ProductCategoriesController);
app.use("/", ProductSituationsController);
app.use("/", ProductsController);
AppDataSource.initialize()
    .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}: http://localhost:${process.env.PORT}/`);
    });
})
    .catch((error) => {
    console.error("Erro na conexão com o banco de dados!", error);
});
//# sourceMappingURL=index.js.map