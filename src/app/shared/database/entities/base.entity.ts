import { randomUUID } from "crypto";
import { BeforeInsert, Column, PrimaryColumn } from "typeorm";

export class BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
    this.createdAt = new Date();
  }
}
