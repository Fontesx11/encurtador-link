import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';

@Controller()
export class RedirectController {

    constructor(private shortenerService: ShortenerService) { }

    @Get(':short_code')
    @Redirect()
    async redirect(@Param('short_code') shortCode: string): Promise<{ url: string; statusCode: number }> {
        const url = await this.shortenerService.findOne(shortCode)
        return { url, statusCode: 302 }
    }

}
