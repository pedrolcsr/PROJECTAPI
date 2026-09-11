import express from "express";
import "dotenv/config";
import login from "./controllers/login.js";
import { AppDataSource } from "./data-source.js";
const app = express();
app.use("/", login);
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