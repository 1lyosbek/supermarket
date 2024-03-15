import { HttpException } from "@nestjs/common";

export class FileTypeNotAllowed extends HttpException{
    constructor() {
        super("only image files are allowed", 400)
    }
}
export class FileNotFound extends HttpException{
    constructor() {
        super("file not found", 404)
    }
}