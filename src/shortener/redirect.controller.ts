import { Controller, Get, Headers, Ip, Param, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';

@Controller()
export class RedirectController {

    constructor(private shortenerService: ShortenerService) { }

    @Get(':short_code')
    @Redirect()
    async redirect(@Param('short_code') shortCode: string, @Ip() ip: string, @Headers('user-agent') userAgent: string | undefined,): Promise<{ url: string; statusCode: number }> {
        const url = await this.shortenerService.redirect(shortCode, ip, userAgent)
        return { url, statusCode: 302 }
    }

}
