import type { Relation } from "typeorm";
import { Product } from "./Products.js";
export declare class ProductSituation {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products: Relation<Product[]>;
}
//# sourceMappingURL=ProductSituations.d.ts.map