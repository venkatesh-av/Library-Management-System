import express, { Request, Response } from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";

const router = express.Router();

router.post("/authors", async (req: Request, res: Response) => {
  try {
    const author = await createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: "Error creating author", error });
  }
});

router.get("/authors", async (req: Request, res: Response) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors", error });
  }
});

router.get("/authors/:id", async (req: Request, res: Response) => {
  try {
    const author = await getAuthorById(Number(req.params.id));
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching author", error });
  }
});

router.put("/authors/:id", async (req: Request, res: Response) => {
  try {
    const author = await updateAuthor(Number(req.params.id), req.body);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating author", error });
  }
});

router.delete("/authors/:id", async (req: Request, res: Response) => {
  try {
    const success = await deleteAuthor(Number(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting author", error });
  }
});

export default router;
