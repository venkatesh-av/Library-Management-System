// src/entities/Borrowing.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.borrowings)
  user!: User;

  @ManyToOne(() => Book, (book) => book.borrowings)
  book!: Book;

  @Column()
  borrowDate!: Date;

  @Column()
  dueDate!: Date;

  @Column({ nullable: true })
  returnDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
