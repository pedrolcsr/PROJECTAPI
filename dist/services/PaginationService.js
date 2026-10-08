export class PaginationService {
    static async paginate(repository, page = 1, limit = 10, order = {}) {
        const totalRecords = await repository.count();
        const lastPage = Math.ceil(totalRecords / limit);
        if (page > lastPage && lastPage > 0) {
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
//# sourceMappingURL=PaginationService.js.map