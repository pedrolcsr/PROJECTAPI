export class PaginationError extends Error {
    constructor(message) {
        super(message);
        this.name = "PaginationError";
    }
}
export class PaginationService {
    static async paginate(repository, page = 1, limit = 10, order = {}) {
        if (!Number.isInteger(page) || page < 1) {
            throw new PaginationError("A página deve ser um número inteiro maior que zero.");
        }
        if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
            throw new PaginationError("O limite deve ser um número inteiro entre 1 e 100.");
        }
        const totalRecords = await repository.count();
        const lastPage = Math.ceil(totalRecords / limit);
        if (lastPage > 0 && page > lastPage) {
            throw new PaginationError(`A página ${page} não existe. Use uma página entre 1 e ${lastPage}.`);
        }
        const data = await repository.find({
            take: limit,
            skip: (page - 1) * limit,
            order
        });
        return {
            error: false,
            data,
            currentPage: page,
            lastPage,
            totalRecords
        };
    }
}
//# sourceMappingURL=PaginationService.js.map