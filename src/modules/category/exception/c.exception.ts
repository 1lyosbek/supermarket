import { HttpException } from "@nestjs/common";

export class CategoryNotFoundException extends HttpException{
    constructor() {
        super("Category not found", 404);
    }
}