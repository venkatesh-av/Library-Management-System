// src/routes/borrowingRoutes.ts

import express, { Request, Response } from "express";
import {
  borrowBook,
  returnBook,
  getAuditLogs,
} from "../controllers/BorrowingControll";

const router = express.Router();

router.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.body;
    const borrowing = await borrowBook(userId, bookId);
    res.status(201).json(borrowing);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error borrowing book", error: (error as any).message });
  }
});

router.post("/return/:id", async (req: Request, res: Response) => {
  try {
    const borrowing = await returnBook(Number(req.params.id));
    res.json(borrowing);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error returning book", error: (error as any).message });
  }
});

router.get("/audit-logs", async (req: Request, res: Response) => {
  try {
    const filters = {
      action: req.query.action as string,
      entityType: req.query.entityType as string,
      startDate: req.query.startDate
        ? new Date(req.query.startDate as string)
        : undefined,
      endDate: req.query.endDate
        ? new Date(req.query.endDate as string)
        : undefined,
    };
    const auditLogs = await getAuditLogs(filters);
    res.json(auditLogs);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching audit logs",
        error: (error as any).message,
      });
  }
});

export default router;
