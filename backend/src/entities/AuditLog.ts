// src/entities/AuditLog.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  action!: string;

  @Column()
  entityType!: string;

  @Column()
  entityId!: number;

  @Column({ type: "json" })
  details!: object;

  @CreateDateColumn()
  createdAt!: Date;
}
