import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { CacheService } from '../cache/cache.service';

@Resolver(() => Genre)
export class GenreResolver {
  constructor(
    private readonly genreService: GenreService,
    private readonly cacheService: CacheService,
  ) {}

  @Mutation(() => Genre)
  createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return this.genreService.create(createGenreInput);
  }

  @Query(() => [Genre], { name: 'genres' })
  async findAll() {
    const cacheKey = 'all_genres';
    let genres = await this.cacheService.get(cacheKey);

    if (!genres) {
      genres = await this.genreService.findAll();
      await this.cacheService.set(cacheKey, genres, 604800); // 7d
    }

    return genres;
  }

  @Query(() => Genre, { name: 'genre' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const cacheKey = `genre_${id}`;
    let genre = await this.cacheService.get(cacheKey);

    if (!genre) {
      genre = await this.genreService.findOne(id);
      await this.cacheService.set(cacheKey, genre, 604800); // 7d
    }

    return genre;
  }

  @Mutation(() => Genre)
  updateGenre(@Args('updateGenreInput') updateGenreInput: UpdateGenreInput) {
    return this.genreService.update(updateGenreInput.id, updateGenreInput);
  }

  @Mutation(() => Genre)
  removeGenre(@Args('id', { type: () => Int }) id: number) {
    return this.genreService.remove(id);
  }
}
