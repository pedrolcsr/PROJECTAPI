import { Table } from "typeorm";
export class CreateProductCategoriesTable1792153889903 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: "product_categories",
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable("product_categories");
    }
}
//# sourceMappingURL=1792153889903-CreateProductCategoriesTable.js.map