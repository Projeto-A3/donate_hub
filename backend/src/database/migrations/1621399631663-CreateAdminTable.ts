import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdminTable1621399631663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'administrators',
          columns: [
            {
              name: 'id',
              type: 'int',
              generationStrategy: 'increment',
              isGenerated: true,
              isPrimary: true, 
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name:'surname',
              type:'varchar',
              isNullable: true
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
              isNullable: false,
            },
            {
              name: 'password',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'type',
              type: 'varchar',
              default: 'admin',
              isNullable: false,
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('administrators');
    }

}
