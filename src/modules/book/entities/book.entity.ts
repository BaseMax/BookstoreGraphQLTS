import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Genre } from 'src/modules/genre/entities/genre.entity';

@ObjectType()
export class Book {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  author: string;

  @Field(() => String)
  ISBN: string;

  @Field({ nullable: true })
  genre?: Genre;
}
