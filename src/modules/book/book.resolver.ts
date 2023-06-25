import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { CacheService } from '../cache/cache.service';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly cacheService: CacheService,
  ) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  async findAll() {
    const cacheKey = 'all_books';
    let books = await this.cacheService.get(cacheKey);

    if (!books) {
      books = await this.bookService.findAll();
      await this.cacheService.set(cacheKey, books, 86400); // 1 day
    }

    return books;
  }

  @Query(() => Book, { name: 'book' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const cacheKey = `book_${id}`;
    let book = await this.cacheService.get(cacheKey);

    if (!book) {
      book = await this.bookService.findOne(id);
      await this.cacheService.set(cacheKey, book, 86400); // 1 day
    }

    return book;
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.remove(id);
  }
}
