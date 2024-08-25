// src/controllers/borrowingController.ts

import { AppDataSource } from "../config/database";
import { Borrowing } from "../entities/Borrowing";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import { AuditLog } from "../entities/AuditLog";

const MAX_BORROW_LIMIT = 5;
const BORROW_DURATION_DAYS = 14;

export async function borrowBook(
  userId: number,
  bookId: number
): Promise<Borrowing> {
  const borrowingRepository = AppDataSource.getRepository(Borrowing);
  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);
  const auditLogRepository = AppDataSource.getRepository(AuditLog);

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["borrowings"],
  });
  const book = await bookRepository.findOne({ where: { id: bookId } });

  if (!user || !book) {
    throw new Error("User or book not found");
  }

  if (user.borrowings.length >= MAX_BORROW_LIMIT) {
    throw new Error("User has reached the maximum borrow limit");
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + BORROW_DURATION_DAYS);

  const borrowing = borrowingRepository.create({
    user,
    book,
    borrowDate: new Date(),
    dueDate,
  });

  await borrowingRepository.save(borrowing);

  // Create audit log
  const auditLog = auditLogRepository.create({
    action: "BORROW",
    entityType: "BOOK",
    entityId: book.id,
    details: { userId, bookId, dueDate },
  });
  await auditLogRepository.save(auditLog);

  return borrowing;
}

export async function returnBook(borrowingId: number): Promise<Borrowing> {
  const borrowingRepository = AppDataSource.getRepository(Borrowing);
  const auditLogRepository = AppDataSource.getRepository(AuditLog);

  const borrowing = await borrowingRepository.findOne({
    where: { id: borrowingId },
    relations: ["book", "user"],
  });

  if (!borrowing) {
    throw new Error("Borrowing not found");
  }

  borrowing.returnDate = new Date();
  await borrowingRepository.save(borrowing);

  // Create audit log
  const auditLog = auditLogRepository.create({
    action: "RETURN",
    entityType: "BOOK",
    entityId: borrowing.book.id,
    details: {
      userId: borrowing.user.id,
      bookId: borrowing.book.id,
      returnDate: borrowing.returnDate,
    },
  });
  await auditLogRepository.save(auditLog);

  return borrowing;
}

export async function getAuditLogs(filters?: {
  action?: string;
  entityType?: string;
  startDate?: Date;
  endDate?: Date;
}): Promise<AuditLog[]> {
  const auditLogRepository = AppDataSource.getRepository(AuditLog);
  let query = auditLogRepository.createQueryBuilder("auditLog");

  if (filters) {
    if (filters.action) {
      query = query.andWhere("auditLog.action = :action", {
        action: filters.action,
      });
    }
    if (filters.entityType) {
      query = query.andWhere("auditLog.entityType = :entityType", {
        entityType: filters.entityType,
      });
    }
    if (filters.startDate) {
      query = query.andWhere("auditLog.createdAt >= :startDate", {
        startDate: filters.startDate,
      });
    }
    if (filters.endDate) {
      query = query.andWhere("auditLog.createdAt <= :endDate", {
        endDate: filters.endDate,
      });
    }
  }

  return await query.getMany();
}
