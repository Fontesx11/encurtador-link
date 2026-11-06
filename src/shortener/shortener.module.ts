import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [ShortenerService],
  controllers: [ShortenerController]
})
export class ShortenerModule {}
