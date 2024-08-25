import express, { Request, Response } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const router = express.Router();

router.post("/books", async (req: Request, res: Response) => {
  try {
    const book = await createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Error creating book", error });
  }
});

router.get("/books", async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

router.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const book = await getBookById(Number(req.params.id));
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
});

router.put("/books/:id", async (req: Request, res: Response) => {
  try {
    const book = await updateBook(Number(req.params.id), req.body);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating book", error });
  }
});

router.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const success = await deleteBook(Number(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

export default router;
