import {DataSource} from "typeorm";

import { User } from "../entity/Users.js";

import {Situation} from "../entity/Situations.js";


export default class CreateUsersSeeds {

    public async run(dataSource: DataSource): Promise<void> {

        console.log("Iniciando a criação de seeds de usuários...");

        const userRepository = dataSource.getRepository(User);

        const situationRepository = dataSource.getRepository(Situation);


        const existingCount = await userRepository.count();
        if (existingCount > 0) {
            console.log("Seeds de usuários já foram criadas. Pulando a criação.");
            return;
        }

        const situation = await situationRepository.findOneBy({ id: 1 });

        if (!situation) {
            console.error("Situação com ID 1 não encontrada. Certifique-se de que as seeds de situações foram criadas antes.");
            return;
        }

        const users = [
            {
                id: 1,
                name: "Admin User",
                email: "admin@admin.com",
                situation: situation,
            },
            {
                id: 2,
                name: "Regular User",
                email: "regular@regular.com",
                situation: situation,
            },
        ];

        await userRepository.save(users);

        console.log("Seeds de usuários criadas com sucesso!");

    }

}