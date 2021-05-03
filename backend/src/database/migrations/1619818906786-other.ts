import {MigrationInterface, QueryRunner} from "typeorm";

export class other1619818906786 implements MigrationInterface {
    name = 'other1619818906786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `requests` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `dueDate` datetime NOT NULL, `status` int NOT NULL DEFAULT '0', `doneeId` varchar(36) NULL, `donorId` varchar(36) NULL, UNIQUE INDEX `REL_c84002d3aa9ee5fde127223b13` (`doneeId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `administrators` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `type` enum ('doador', 'donatario', 'admin') NOT NULL DEFAULT 'doador', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `requests` ADD CONSTRAINT `FK_c84002d3aa9ee5fde127223b131` FOREIGN KEY (`doneeId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `requests` ADD CONSTRAINT `FK_0103223f7a2801ac8ce0015c7ac` FOREIGN KEY (`donorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `requests` DROP FOREIGN KEY `FK_0103223f7a2801ac8ce0015c7ac`");
        await queryRunner.query("ALTER TABLE `requests` DROP FOREIGN KEY `FK_c84002d3aa9ee5fde127223b131`");
        await queryRunner.query("DROP TABLE `administrators`");
        await queryRunner.query("DROP INDEX `REL_c84002d3aa9ee5fde127223b13` ON `requests`");
        await queryRunner.query("DROP TABLE `requests`");
    }

}
