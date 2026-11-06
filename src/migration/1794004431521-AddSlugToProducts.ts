import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToProducts1794004431521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `products` ADD `slug` varchar(255) NOT NULL'
        );

        await queryRunner.query(
            'CREATE UNIQUE INDEX `IDX_464f927ae360106b783ed0b410` ON `products` (`slug`)'
        );

        await queryRunner.query(
            'ALTER TABLE `products` MODIFY COLUMN `slug` varchar(255) NOT NULL AFTER `name`'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'DROP INDEX `IDX_464f927ae360106b783ed0b410` ON `products`'
        );

        await queryRunner.query(
            'ALTER TABLE `products` DROP COLUMN `slug`'
        );
    }
}