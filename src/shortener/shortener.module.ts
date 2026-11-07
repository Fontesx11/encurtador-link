import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Access } from './entities/access.entity';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { RedirectController } from './redirect.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Link, Access])],
  providers: [ShortenerService],
  controllers: [ShortenerController, RedirectController]
})
export class ShortenerModule {}
