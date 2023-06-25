import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [BookResolver, BookService],
})
export class BookModule {}
