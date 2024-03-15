import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    count : number;
        
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    productId : number;
    
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    userId : number;
}
