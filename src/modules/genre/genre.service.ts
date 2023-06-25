import { Injectable } from '@nestjs/common';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}
  create(createGenreInput: CreateGenreInput) {
    return this.prisma.genre.create({ data: createGenreInput });
  }

  findAll() {
    return this.prisma.genre.findMany({ include: { books: true } });
  }

  findOne(id: number) {
    return this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });
  }

  update(id: number, updateGenreInput: UpdateGenreInput) {
    return this.prisma.genre.update({ where: { id }, data: updateGenreInput });
  }

  remove(id: number) {
    return this.prisma.genre.delete({ where: { id } });
  }
}
