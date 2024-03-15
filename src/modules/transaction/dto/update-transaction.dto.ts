import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateTransactionDto {
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    count : number;
        
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    productId : number;
    
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    userId : number;
}
