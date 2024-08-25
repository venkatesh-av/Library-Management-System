import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Borrowing } from "./Borrowing";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: true })
  name!: string;

  @Column({ unique: true, default: "unknown@example.com" })
  email!: string;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.user)
  borrowings!: Borrowing[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
