import { TableColumn } from "typeorm";
export class AddRecoverPasswordToUsers1795001905280 {
    async up(queryRunner) {
        await queryRunner.addColumn("users", new TableColumn({
            name: "recoverPassword",
            type: "varchar",
            length: "255",
            isUnique: true,
            isNullable: true,
        }));
        await queryRunner.query("ALTER TABLE `users` MODIFY COLUMN `recoverPassword` varchar(255) NOT NULL AFTER `password`");
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "recoverPassword");
    }
}
//# sourceMappingURL=1795001905280-AddRecoverPasswordToUsers.js.map