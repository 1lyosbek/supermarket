import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    count: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    categoryId: number;
}
