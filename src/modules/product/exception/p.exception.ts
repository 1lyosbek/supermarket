import { HttpException } from "@nestjs/common";

export class ProductNotFoundException extends HttpException{
    constructor() {
        super("Product not found", 404);
    }
}