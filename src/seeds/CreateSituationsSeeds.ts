import { DataSource } from 'typeorm';
import { Situation } from '../entity/Situations.js';

export default class CreateSituationsSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para tabela 'situations'...");

        const situationRepository = dataSource.getRepository(Situation);

        const existingSituations = await situationRepository.count();

        if(existingSituations > 0) {
            console.log("A tabela 'situations' já possui dados. O seed não será executado.");
            return;
        }

        const situations = [
            { nameSituation: 'Ativo' },
            { nameSituation: 'Inativo' },
            { nameSituation: 'Pendente' },
            { nameSituation: 'Concluído' },
            { nameSituation: 'Cancelado' }
        ];

        await situationRepository.save(situations);

        console.log("Seed para tabela 'situations' concluído com sucesso!");

    }

}