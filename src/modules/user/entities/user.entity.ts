import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from 'src/modules/book/entities/book.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => [Book], { nullable: true })
  books: [Book];
}
