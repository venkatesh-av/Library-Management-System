import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { BookLoan } from "../entities/BookLoan";
import { AuditLog } from "../entities/AuditLog";
import { Borrowing } from "../entities/Borrowing";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, BookLoan, AuditLog, Borrowing, Book, Author],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error", error);
  });
