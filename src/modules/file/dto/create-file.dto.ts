import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateFileDto {
    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    fileName: string;
}
