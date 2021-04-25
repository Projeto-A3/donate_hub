import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationAddressUser1619372721168 implements MigrationInterface {
    name = 'RelationAddressUser1619372721168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `surname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `cpf_cnpj` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `birthDate` datetime NOT NULL, `status` int NOT NULL DEFAULT '0', `type` enum ('doador', 'donatario', 'admin') NOT NULL DEFAULT 'doador', `dependents` int NOT NULL DEFAULT '0', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `addresses` (`id` int NOT NULL AUTO_INCREMENT, `street` varchar(255) NOT NULL, `number` varchar(255) NOT NULL, `additionalAddress` varchar(255) NOT NULL, `district` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `zipCode` varchar(255) NOT NULL, `userId` varchar(36) NULL, UNIQUE INDEX `REL_95c93a584de49f0b0e13f75363` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `addresses` ADD CONSTRAINT `FK_95c93a584de49f0b0e13f753630` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `addresses` DROP FOREIGN KEY `FK_95c93a584de49f0b0e13f753630`");
        await queryRunner.query("DROP INDEX `REL_95c93a584de49f0b0e13f75363` ON `addresses`");
        await queryRunner.query("DROP TABLE `addresses`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
