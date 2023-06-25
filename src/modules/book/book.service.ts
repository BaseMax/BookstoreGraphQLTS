import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBookInput: CreateBookInput) {
    return this.prisma.book.create({
      data: {
        title: createBookInput.title,
        author: createBookInput.author,
        ISBN: createBookInput.ISBN,
        genre: {
          connectOrCreate: {
            where: {
              id: createBookInput.genreId,
              name: createBookInput.genreName,
            },
            create: { name: createBookInput.genreName },
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.book.findMany({ include: { genre: true } });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return this.prisma.book.update({ where: { id }, data: updateBookInput });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
