# Library Management System

A RESTful API for managing a library, built with Node.js, Express, TypeScript, and TypeORM.

## Features
- User, Author, and Book Management
- Borrowing System with constraints
- Audit Logging

## Prerequisites
- Node.js (v14+)
- PostgreSQL

## Setup
1. Clone the repo and install dependencies:

git clone https://github.com/venkatesh-av/Library-Management-System.git
cd library-management-system
npm install

2. Set up `.env` in the root directory:
DB_HOST=localhost  
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=library_db
PORT=3005 (here you can use 3000, my ports are in busy with running other things thats why i made it3005)

Server runs at `http://localhost:3005`

## API Endpoints

### Users
- POST /users: Create user
- GET /users: Get all users
- GET /users/:id: Get user by ID
- PUT /users/:id: Update user
- DELETE /users/:id: Delete user

### Authors
- POST /authors: Create author
- GET /authors: Get all authors
- GET /authors/:id: Get author by ID
- PUT /authors/:id: Update author
- DELETE /authors/:id: Delete author

### Books
- POST /books: Create book
- GET /books: Get all books
- GET /books/:id: Get book by ID
- PUT /books/:id: Update book
- DELETE /books/:id: Delete book

### Borrowing
- POST /borrow: Borrow a book
- POST /return/:id: Return a book
- GET /audit-logs: Get audit logs (with optional filters)

## Quick Start Guide
1. Ensure PostgreSQL is running and create a database named `library_db`
2. Set up the `.env` file with your database credentials
3. Run `npm install` to install dependencies
4. Run `npm run typeorm migration:run` to set up the database schema
5. (Optional) Run `npm run seed` to populate the database with sample data
6. Run `npm start` to start the server
7. Use Postman or curl to interact with the API endpoints

## Notes
- Max borrow limit: 5 books per user
- Borrow duration: 14 days
- Audit logs track all borrowing and returning activities

For more detailed documentation or support, please open an issue on the GitHub repository.
