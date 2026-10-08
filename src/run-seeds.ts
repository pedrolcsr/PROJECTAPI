import { AppDataSource } from "./data-source.js";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds.js";

const runSeeds = async () => {
    console.log("Conectando ao banco de dados...");

    await AppDataSource.initialize()

    console.log("Conexão estabelecida com sucesso!");

    try {
        const situationsSeeds = new CreateSituationsSeeds();
        
        await situationsSeeds.run(AppDataSource);

    } catch (error) {

        console.error("Erro ao executar o seed:", error);

    }finally {

        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");

    }


};
runSeeds();