import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAddressTable1619306941896 
implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'addresses',
          columns: [
            {
              name: 'id',
              type: 'int',
              generationStrategy: 'increment',
              isGenerated: true,
              isPrimary: true,  
            },
            {
              name: 'street',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'number',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'additionalDetails',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'district',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'city',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'state',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'zipCode',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'userId',
              type: 'varchar',
              isNullable: true,
            },
          ],
          foreignKeys: [
            {
              name: 'addressesUser',
              columnNames: ['userId'],
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('addresses')
    }

}
