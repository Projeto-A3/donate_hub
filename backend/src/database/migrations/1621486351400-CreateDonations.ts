import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDonations1621486351400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'donations',
          columns: [
            {
              name: 'id',
              type: 'int',
              generationStrategy: 'increment',
              isGenerated: true,
              isPrimary: true,
            },
            {
              name: 'title',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'dueDate',
              type: 'datetime',
              isNullable: true,
              default: 'now()',
            },
            {
              name:'status',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'doneeId',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'donorId',
              type: 'varchar',
              isNullable: true,
            },
          ],
          foreignKeys: [
            {
              name: 'donationsDonor',
              columnNames: ['donorId'],
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
            },
            {
              name: 'donationsDonee',
              columnNames: ['doneeId'],
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
      await queryRunner.dropTable('donations')
    }

}
