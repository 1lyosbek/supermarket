import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto extends CreateCategoryDto {
    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    name: string;
}

