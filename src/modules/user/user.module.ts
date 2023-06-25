import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
