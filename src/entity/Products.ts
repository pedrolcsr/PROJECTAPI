
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import type { Relation } from "typeorm";

import { ProductSituation } from "./ProductSituations.js";
import { ProductCategory } from "./ProductCategories.js";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(
        () => ProductCategory,
        (productCategory) => productCategory.products
    )
    @JoinColumn({ name: "productCategoryId" })
    productCategory!: Relation<ProductCategory>;

    @ManyToOne(
        () => ProductSituation,
        (productSituation) => productSituation.products
    )
    @JoinColumn({ name: "productSituationId" })
    productSituation!: Relation<ProductSituation>;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt!: Date;
}
