import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableTasks1704839239342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "text",
          },
          {
            name: "task",
            type: "text",
          },
          {
            name: "author",
            type: "varchar",
            length: "100",
          },
          {
            name: "created_at",
            type: "timestamp",
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["author"],
            referencedColumnNames: ["username"],
            referencedTableName: "users",
            name: "fk_tasks_author",
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks", true, true, true);
  }
}
