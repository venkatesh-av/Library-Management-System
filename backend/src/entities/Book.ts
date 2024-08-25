import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Author } from "./Author";
import { Borrowing } from "./Borrowing";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "int" })
  publishedYear!: number;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  borrowings!: Borrowing[];

  @ManyToOne(() => Author, (author) => author.books)
  author!: Author;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
