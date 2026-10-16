import { Table, TableForeignKey } from "typeorm";
export class CreateProductsTable1792153909989 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "productCategoryId",
                    type: "int",
                },
                {
                    name: "productSituationId",
                    type: "int",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                },
            ],
        }));
        await queryRunner.createForeignKey("products", new TableForeignKey({
            columnNames: ["productCategoryId"],
            referencedTableName: "product_categories",
            referencedColumnNames: ["id"],
        }));
        await queryRunner.createForeignKey("products", new TableForeignKey({
            columnNames: ["productSituationId"],
            referencedTableName: "product_situations",
            referencedColumnNames: ["id"],
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("products");
        if (table) {
            for (const foreignKey of table.foreignKeys) {
                await queryRunner.dropForeignKey("products", foreignKey);
            }
        }
        await queryRunner.dropTable("products");
    }
}
//# sourceMappingURL=1792153909989-CreateProductsTable.js.map