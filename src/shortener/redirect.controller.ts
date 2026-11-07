import { Controller, Get, Headers, Ip, Param, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { RedirectResponse } from './dto/return-shortener.dto';

@Controller()
export class RedirectController {

    constructor(private shortenerService: ShortenerService) { }

    @Get(':short_code')
    @Redirect()
    async redirect(@Param('short_code') shortCode: string, @Ip() ip: string, @Headers('user-agent') userAgent: string | undefined): Promise<RedirectResponse> {
        const url = await this.shortenerService.redirect(shortCode, ip, userAgent)
        return { url, statusCode: 302 }
    }

}
