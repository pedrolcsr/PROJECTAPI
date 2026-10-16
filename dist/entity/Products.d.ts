import type { Relation } from "typeorm";
import { ProductSituation } from "./ProductSituations.js";
import { ProductCategory } from "./ProductCategories.js";
export declare class Product {
    id: number;
    name: string;
    productCategory: Relation<ProductCategory>;
    productSituation: Relation<ProductSituation>;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Products.d.ts.map