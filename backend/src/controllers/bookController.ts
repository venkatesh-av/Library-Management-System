import { AppDataSource } from "../config/database";
import { Book } from "../entities/Book";

export async function createBook(bookData: Partial<Book>): Promise<Book> {
  const bookRepository = AppDataSource.getRepository(Book);
  const book = bookRepository.create(bookData);
  return await bookRepository.save(book);
}

export async function getAllBooks(): Promise<Book[]> {
  const bookRepository = AppDataSource.getRepository(Book);
  return await bookRepository.find({ relations: ["author"] });
}

export async function getBookById(id: number): Promise<Book | null> {
  const bookRepository = AppDataSource.getRepository(Book);
  return await bookRepository.findOne({ where: { id }, relations: ["author"] });
}

export async function updateBook(
  id: number,
  bookData: Partial<Book>
): Promise<Book | null> {
  const bookRepository = AppDataSource.getRepository(Book);
  await bookRepository.update(id, bookData);
  return await bookRepository.findOne({ where: { id }, relations: ["author"] });
}

export async function deleteBook(id: number): Promise<boolean> {
  const bookRepository = AppDataSource.getRepository(Book);
  const result = await bookRepository.delete(id);
  return result.affected === 1;
}
