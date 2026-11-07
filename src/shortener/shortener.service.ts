import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { FindManyOptions, FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PaginationQueryDto } from '../core/dto/pagination-query.dto';
import { Page, paginate } from '../core/utils/pagination.utils';
import { MessageResponse, ShortenResponse } from './dto/return-shortener.dto';

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

    async short(original_link: string): Promise<ShortenResponse> {

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

    async find(options: FindManyOptions<Link>, mode: 'many'): Promise<Link[]>;
    async find(options: FindOneOptions<Link>, mode?: 'one'): Promise<Link>;
    async find(options: FindManyOptions<Link>, mode: 'one' | 'many' = 'one'): Promise<Link | Link[]> {
        if (mode === 'many') {
            return this.linksRepository.find(options);
        }

        const club = await this.linksRepository.findOne(options);

        if (!club) {
            throw new NotFoundException('Link not found');
        }

        return club;
    }

    async findAll(query: PaginationQueryDto): Promise<Page<Link>> {
        const links = await this.linksRepository.find({
            select: {
                shortCode: true,
                originalLink: true,
                clickCount: true,
            }
        })

        if (!links) {
            throw new NotFoundException("Links not found")
        }

        return paginate(links, query.page, query.limit)
    }

    async findOne(short_code: string){
        const {originalLink} = await this.find({where:{
            shortCode: short_code
        }})

        return originalLink
    }

    async remove(short_code: string): Promise<MessageResponse> {
        const link = await this.find({ where: { shortCode: short_code } })

        await this.linksRepository.softRemove(link);

        return {
            "message": "Link deleted successfully"
        }
    }
}
