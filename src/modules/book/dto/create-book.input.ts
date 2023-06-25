import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  author: string;

  @Field()
  @IsString()
  ISBN: string;

  @Field({ nullable: true })
  genreId?: number;

  @Field({ nullable: true })
  genreName?: string;
}
