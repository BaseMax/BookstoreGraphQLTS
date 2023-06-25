import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  purchaseBook(userId: number, bookId: number) {
    return this.prisma.purchasedBooks.create({
      data: {
        book: { connect: { id: bookId } },
        user: { connect: { id: userId } },
      },
      include: { book: true, user: true },
    });
  }

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({ data: createUserInput });
  }

  findAll() {
    return this.prisma.user.findMany({ include: { books: true } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { books: true },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({ where: { id }, data: updateUserInput });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
