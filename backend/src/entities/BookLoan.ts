import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class BookLoan {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Book)
  book!: Book;

  @Column({ type: "date" })
  borrowDate!: Date;

  @Column({ type: "date", nullable: true })
  returnDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
