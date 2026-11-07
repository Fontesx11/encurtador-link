import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt({ message: 'a página deve ser um número inteiro' })
  @Min(1, { message: 'a página deve ser maior que zero' })
  page: number = 1;

  @Type(() => Number)
  @IsInt({ message: 'o limite deve ser um número inteiro' })
  @Min(1, { message: 'o limite deve estar entre 1 e 50' })
  @Max(50, { message: 'o limite deve estar entre 1 e 50' })
  limit: number = 10;
}
