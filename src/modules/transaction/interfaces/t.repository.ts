import { ID } from "src/common/types/type";
import { TransactionEntity } from "../entities/transaction.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { ProductEntity } from "src/modules/product/entities/product.entity";

export interface ITransactionRepository{
    findOneByUserId(id: ID): Promise<TransactionEntity[]>;
    findOneByProductId(id: ID): Promise<TransactionEntity[]>;
    findOneById(id: ID): Promise<TransactionEntity>;
    findAllTransactions(): Promise<TransactionEntity[]>;
    create(transaction: TransactionEntity, productEntity: ProductEntity): Promise<TransactionEntity>;
    update(transaction: TransactionEntity): Promise<TransactionEntity>;
    delete(id: ID): Promise<TransactionEntity>;
}