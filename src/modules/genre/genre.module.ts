import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreResolver } from './genre.resolver';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [GenreResolver, GenreService],
})
export class GenreModule {}
