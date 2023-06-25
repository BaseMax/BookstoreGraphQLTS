import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from 'src/modules/book/entities/book.entity';

@ObjectType()
export class Genre {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Book], { nullable: true })
  books: [Book];
}
