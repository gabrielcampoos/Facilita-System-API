import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { TaskEntity } from ".";
import { randomUUID } from "crypto";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => TaskEntity, (entity) => entity.user)
  tasks!: TaskEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
