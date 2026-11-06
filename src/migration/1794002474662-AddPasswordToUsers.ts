import { TableColumn } from "typeorm";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUsers1794002474662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const passwordColumn = await queryRunner.hasColumn("users", "password");

        if (!passwordColumn) {
            await queryRunner.addColumn("users", new TableColumn({
                name: "password",
                type: "varchar",
                length: "255",
                isNullable: false,
            }));
        }

        await queryRunner.query(
            "ALTER TABLE `users` MODIFY COLUMN `password` varchar(255) NOT NULL AFTER `email`"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "password");
    }

}