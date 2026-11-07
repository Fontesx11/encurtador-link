import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { PaginationQueryDto } from '../core/dto/pagination-query.dto';
import { ShortenerLinkResponseDto } from './dto/return-shortener.dto';

@Controller()
export class ShortenerController {

    constructor(private shortenerService: ShortenerService) { }

    @Post('shorten')
    create(@Body() dto: CreateShortenerDto) {
        return this.shortenerService.short(dto.url)
    }

    @Get('links')
    async get(@Query() query: PaginationQueryDto) {
        const page = await this.shortenerService.findAll(query);
        return {
            data: page.data.map((player) => new ShortenerLinkResponseDto(player)),
            meta: page.meta,
        };
    }

    @Delete('links/:short_code')
    async remove(@Param('short_code') short_code: string) {
       return await this.shortenerService.remove(short_code);
    }

}
