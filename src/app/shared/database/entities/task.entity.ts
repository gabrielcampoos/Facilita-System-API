import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, UserEntity } from ".";

@Entity({ name: "tasks" })
export class TaskEntity extends BaseEntity {
  @Column()
  title?: string;

  @Column()
  task?: string;

  @Column()
  author!: string;

  @ManyToOne(() => UserEntity, (entity) => entity.tasks)
  @JoinColumn({
    name: "author",
    foreignKeyConstraintName: "fk_tasks_author",
    referencedColumnName: "username",
  })
  user!: UserEntity;
}
