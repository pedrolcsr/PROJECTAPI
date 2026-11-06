import { TableColumn } from "typeorm";
export class AddPasswordToUsers1794002474662 {
    async up(queryRunner) {
        const passwordColumn = await queryRunner.hasColumn("users", "password");
        if (!passwordColumn) {
            await queryRunner.addColumn("users", new TableColumn({
                name: "password",
                type: "varchar",
                length: "255",
                isNullable: false,
            }));
        }
        await queryRunner.query("ALTER TABLE `users` MODIFY COLUMN `password` varchar(255) NOT NULL AFTER `email`");
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "password");
    }
}
//# sourceMappingURL=1794002474662-AddPasswordToUsers.js.map