import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserTable1618693786281
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            generationStrategy: 'uuid',
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
            name: 'cpf_cnpj',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'birthDate',
            type: 'date',
            isNullable: true
          },
          {
            name:'status',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            isNullable: false,
            enum: ['doador', 'donatario', 'admin']
          },
          {
            name: 'dependents',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
