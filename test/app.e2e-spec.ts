import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { BookService } from '../src/modules/book/book.service';

describe('(e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let bookService: BookService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    bookService = moduleFixture.get<BookService>(BookService);
    await app.init();
  });

  afterAll(async () => {
    await prismaService.book.deleteMany({});
    await prismaService.genre.deleteMany({});

    await app.close();
  });

  describe('book', () => {
    it('should create a new book', async () => {
      const createBookInput = {
        title: 'Book Title',
        author: 'Book Author',
        ISBN: '12345678290',
        genreName: 'Fictioen',
      };

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          mutation {
            createBook(createBookInput: {
              title: "${createBookInput.title}",
              author: "${createBookInput.author}",
              ISBN: "${createBookInput.ISBN}",
              genreName: "${createBookInput.genreName}"
            }) {
              id
              title
              author
              ISBN
              genre {
                id
                name
              }
            }
          }
        `,
        })
        .expect(200);

      const createdBook = response.body.data.createBook;

      expect(createdBook.id).toBeDefined();
      expect(createdBook.title).toBe(createBookInput.title);
      expect(createdBook.author).toBe(createBookInput.author);
    });

    it('should return an array of books', async () => {
      await bookService.create({
        title: 'Book 1',
        author: 'Author 1',
        ISBN: '12345678490',
        genreName: 'Fiction',
      });
      await bookService.create({
        title: 'Book 2',
        author: 'Author 2',
        ISBN: '09876154321',
        genreName: 'Fiction2',
      });

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              books {
                id
                title
                author
                ISBN
                genre {
                  id
                  name
                }
              }
            }
          `,
        })
        .expect(200);
    });

    it('should return a single book', async () => {
      const createdBook = await bookService.create({
        title: 'Book Title',
        author: 'Book Author',
        ISBN: '12345627890',
        genreName: 'Fictions',
      });

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              book(id: ${createdBook.id}) {
                id
                title
                author
                ISBN
                genre {
                  id
                  name
                }
              }
            }
          `,
        })
        .expect(200);

      const book = response.body.data.book;

      expect(book.id).toBe(createdBook.id);
      expect(book.title).toBe('Book Title');
      expect(book.author).toBe('Book Author');
    });
  });
});
