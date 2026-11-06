import { IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  url: string;
}
