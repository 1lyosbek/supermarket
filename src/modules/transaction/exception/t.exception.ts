import { HttpException } from "@nestjs/common";

export class CountExceptions extends HttpException{
    constructor() {
        super("There is no product yet or transaction count is bigger than found product's count. Please check it", 400)
    }
}

export class TransactionNotFoundException extends HttpException{
    constructor() {
        super("Transaction not found", 404)
    }
}