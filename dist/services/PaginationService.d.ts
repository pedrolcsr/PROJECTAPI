import type { Repository, ObjectLiteral, FindOptionsOrder, FindOptionsRelations } from "typeorm";
interface PaginationResults<T> {
    error: boolean;
    data: T[];
    currentPage: number;
    lastPage: number;
    totalRecords: number;
}
export declare class PaginationError extends Error {
    constructor(message: string);
}
export declare class PaginationService {
    static paginate<T extends ObjectLiteral>(repository: Repository<T>, page?: number, limit?: number, order?: FindOptionsOrder<T>, relations?: FindOptionsRelations<T>): Promise<PaginationResults<T>>;
}
export {};
//# sourceMappingURL=PaginationService.d.ts.map