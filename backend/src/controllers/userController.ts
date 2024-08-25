import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

// Create a new user
export async function createUser(userData: Partial<User>): Promise<User> {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(userData);
  return await userRepository.save(user);
}

// Get all users
export async function getAllUsers(): Promise<User[]> {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find();
}

// Get a user by ID
export async function getUserById(id: number): Promise<User | null> {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOneBy({ id });
}
// Update a user
export async function updateUser(
  id: number,
  userData: Partial<User>
): Promise<User | null> {
  const userRepository = AppDataSource.getRepository(User);
  await userRepository.update(id, userData);
  return await userRepository.findOneBy({ id });
}

// Delete a user

export async function deleteUser(id: number): Promise<boolean> {
  const userRepository = AppDataSource.getRepository(User);
  const result = await userRepository.delete(id);
  return result.affected === 1;
}
