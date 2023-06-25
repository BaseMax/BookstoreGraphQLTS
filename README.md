# TypeScript GraphQL API for Bookstore

This is a TypeScript-based GraphQL API for a bookstore that allows users to browse books and manage their accounts. The API is built using Apollo Server, and it uses Redis for caching and PostgreSQL as the database. Docker is used to automatically install PostgreSQL and the GraphQL tools.

## Features

- Browse books: users can query for a list of all books or search for a book by its ID.
- Manage accounts: users can create, update, and delete their accounts, as well as purchase books.
- Browse genres: users can query for a list of all genres.
- Caching: the API uses Redis to cache the books query for at least a day, the users query for 3 hours, and the genres query for 1 week.

## Technologies

- TypeScript
- Apollo Server
- Redis
- PostgreSQL
- Docker

## Getting Started

To get started with the project, follow these steps:

Clone the repository:

```bash
git clone https://github.com/BaseMax/BookstoreGraphQLTS
```

Install dependencies:
```bash
cd BookstoreGraphQLTS
npm install
```

Start the PostgreSQL and Redis servers using Docker:
```bash
docker-compose up -d
```

Start the server:
```bash
npm run start
```

Visit http://localhost:4000/graphql to interact with the API using the GraphQL Playground.

## Background

You are tasked with building a GraphQL API for a bookstore that will allow users to browse books and manage their accounts. The API should be built using TypeScript and Apollo Server, and it should use Redis for caching and PostgreSQL as the database. Docker should be used to automatically install PostgreSQL and the GraphQL tools.

## Requirements

The GraphQL API should have the following types:
- Book: a book has an ID, title, author, ISBN, and an array of genres.
- User: a user has an ID, name, email, password, and an array of books they have purchased.
- Genre: a genre has an ID and a name.


The API should have the following queries and mutations.

### Queries:

- books: returns a list of all books. This query should be cached in Redis for at least a day.
```graphql
query {
  books {
    id
    title
    author
    ISBN
    genre {
      name
    }
  }
}
```

- book: returns a book by its ID.
```graphql
query {
  book(id: id) {
    id
    title
    author
    ISBN
    genre {
      name
    }
  }
}
```

- users: returns a list of all users.
```graphql
query {
  users {
    id
    name
    email
    books
  }
}
```

- user: returns a user by their ID.
```graphql
query($id: ID!) {
  user(id: $id) {
    id
    name
    email
    books
  }
}
```

- genres: returns a list of all genres. This query should be cached in Redis for 1 week.
```graphql
query {
  genres {
    id
    name
  }
}
```

### Mutations

- createBook: creates a new book.
```graphql
mutation {
  createBook(createBookInput) {
    id
    title
    author
    ISBN
    genres
  }
}
```

- updateBook: updates a book by its ID.

```graphql
mutation {
  updateBook(updateBookInput) {
    id
    title
    author
    ISBN
    genres
  }
}
```

- deleteBook: deletes a book by its ID.

```graphql
mutation {
  removeBook(id: id) {
    id
    title
    author
    ISBN
    genres
  }
}
```

- purchaseBook: adds a book to a user's list of purchased books.

```graphql
mutation {
  purchaseBook(userId: $userId, bookId: $bookId) {
    id
    name
    email
    books
  }
}
```

- createUser: creates a new user.
```graphql
mutation() {
  createUser(createUserInout) {
    id
    name
    email
  }
}
```

- updateUser: updates a user by their ID.

```graphql
mutation {
  updateUser(updateUserInput) {
    id
    name
    email
    books
  }
}
```

- deleteUser: deletes a user by their ID.

```graphql
mutation() {
  deleteUser(id: $id) {
    id
    name
    email
    books
  }
}
```

The API should use Redis to cache the books query for at least a day, the users query for 3 hours, and the genres query for 1 week.

The API should use PostgreSQL as the database for storing and retrieving data.

Docker should be used to automatically install PostgreSQL and the GraphQL tools.

## Deliverables

- Instructions for running the API using Docker.

- A brief write-up explaining any design decisions and assumptions made during the development process.

Note: This is just an example assignment and you can customize it based on your specific requirements and needs.

## Contributions

Contributions are welcome! If you find a bug or would like to suggest a new feature, please open an issue or a pull request.

Copyright 2023, Max Base
