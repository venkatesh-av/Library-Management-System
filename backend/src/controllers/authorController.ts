import { AppDataSource } from "../config/database";
import { Author } from "../entities/Author";

export async function createAuthor(
  authorData: Partial<Author>
): Promise<Author> {
  const authorRepository = AppDataSource.getRepository(Author);
  const author = authorRepository.create(authorData);
  return await authorRepository.save(author);
}

export async function getAllAuthors(): Promise<Author[]> {
  const authorRepository = AppDataSource.getRepository(Author);
  return await authorRepository.find();
}

export async function getAuthorById(id: number): Promise<Author | null> {
  const authorRepository = AppDataSource.getRepository(Author);
  return await authorRepository.findOneBy({ id });
}

export async function updateAuthor(
  id: number,
  authorData: Partial<Author>
): Promise<Author | null> {
  const authorRepository = AppDataSource.getRepository(Author);
  await authorRepository.update(id, authorData);
  return await authorRepository.findOneBy({ id });
}

export async function deleteAuthor(id: number): Promise<boolean> {
  const authorRepository = AppDataSource.getRepository(Author);
  const result = await authorRepository.delete(id);
  return result.affected === 1;
}
