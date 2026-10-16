
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";

import { Product } from "./Products.js";

@Entity("product_categories")
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt!: Date;

    @OneToMany(() => Product, (product) => product.productCategory)
    products!: Product[];
}
