import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1704839225111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "username",
            type: "varchar",
            length: "50",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users", true, true, true);
  }
}
