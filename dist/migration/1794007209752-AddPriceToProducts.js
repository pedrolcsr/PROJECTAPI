import { TableColumn } from "typeorm";
export class AddPriceToProducts1794002474663 {
    async up(queryRunner) {
        await queryRunner.addColumn("products", new TableColumn({
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
            default: 0
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("products", "price");
    }
}
//# sourceMappingURL=1794007209752-AddPriceToProducts.js.map