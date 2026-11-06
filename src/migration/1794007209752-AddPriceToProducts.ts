import { TableColumn } from "typeorm";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceToProducts1794002474663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "products",
            new TableColumn({
                name: "price",
                type: "decimal",
                precision: 10,
                scale: 2,
                isNullable: false,
                default: 0
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "price");
    }
}