import { TableColumn } from "typeorm";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecoverPasswordToUsers1795001905280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("users", new TableColumn({
            name: "recoverPassword",
            type: "varchar",
            length: "255",
            isUnique: true,
            isNullable: true,
        }));

        await queryRunner.query(
            "ALTER TABLE `users` MODIFY COLUMN `recoverPassword` varchar(255) NOT NULL AFTER `password`"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn("users", "recoverPassword");

    }

}
