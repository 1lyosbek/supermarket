import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
     @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    title: string;

    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @Min(0)
    @IsOptional()
    price: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @Min(0)
    @IsOptional()
    count: number;
}
