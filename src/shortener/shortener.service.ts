import { ConflictException, Injectable, InternalServerErrorException, RequestTimeoutException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { QueryFailedError, Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

@Injectable()
export class ShortenerService {
    private readonly baseUrl: string

    constructor(
        @InjectRepository(Link)
        private readonly linksRepository: Repository<Link>,
        private readonly configService: ConfigService,
    ) { 
        this.baseUrl = this.configService.getOrThrow<string>('BASE_URL')
    }

    async short(original_link: string) {

        const MAX_ATTEMPTS = 3


        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            const code = this.generateShortCode(7)

            try {

                const link = this.linksRepository.create({
                    originalLink: original_link,
                    shortCode: code,
                })

                await this.linksRepository.save(link)

                return {
                    short_url: `${this.baseUrl}/${code}`,
                    original_url: original_link,
                }
            } catch (error) {
                if (error instanceof QueryFailedError && error.driverError.code === '23505') {
                    continue 
                }

               
                throw error
            }
        }
        throw new InternalServerErrorException('Could not generate a unique short code')
    }

    private generateShortCode(length: number): string {
        let code = ''

        for (let i = 0; i < length; i++) {
            const index = randomInt(ALPHABET.length)
            code += ALPHABET[index]
        }

        return code
    }


}
