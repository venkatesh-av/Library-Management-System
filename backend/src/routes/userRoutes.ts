import express, { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";

const router = express.Router();

// Create a new user
router.post("/user", async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

// Get all users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Get a user by ID
router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// Update a user
router.put("/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
});

// Delete a user
router.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const success = await deleteUser(Number(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Delete all users
router.delete("/users", async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.clear();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting all users", error });
  }
});

export default router;
