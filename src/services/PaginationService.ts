import type { Repository, ObjectLiteral, FindOptionsOrder } from "typeorm";

interface PaginationResults<T> {
    error: boolean;
    data: T[];
    currentPage: number;
    lastPage: number;
    totalRecords: number;
}

export class PaginationService {
    static async paginate<T extends ObjectLiteral>(
          repository: Repository<T>,
          page: number = 1,
          limit: number = 10,
          order:FindOptionsOrder<T> = {}
    ): Promise<PaginationResults<T>> {

        const totalRecords = await repository.count();

        const lastPage = Math.ceil(totalRecords / limit);

        if(page > lastPage && lastPage > 0) {
            throw new Error(`A pagina ${page} não existe. Use uma pagina entre 1 e ${lastPage}.`);
        }

        const offset = (page - 1) * limit;

        const data = await repository.find({
            take: limit,
            skip: offset,
            order: order
        });

        return {
            error: false,
            data: data,
            currentPage: page,
            lastPage: lastPage,
            totalRecords: totalRecords
        };

    }

}