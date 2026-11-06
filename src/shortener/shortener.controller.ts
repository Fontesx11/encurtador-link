import { Body, Controller, Post } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';

@Controller('shortener')
export class ShortenerController {

    constructor( private shortenerService: ShortenerService){}

    @Post()
    create(@Body() dto: CreateShortenerDto) {
        return this.shortenerService.short(dto.url)
    }
}
