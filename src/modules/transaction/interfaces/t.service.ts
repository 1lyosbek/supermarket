import { ResData } from "src/lib/resData";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";
import { ID } from "src/common/types/type";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";

export interface ITransactionService{
    findAll(): Promise<ResData<TransactionEntity[]>>;
    findOneById(id: ID): Promise<ResData<TransactionEntity>>;
    findOneByUserId(id: ID): Promise<ResData<TransactionEntity[]>>;
    findOneByProductId(id: ID): Promise<ResData<TransactionEntity[]>>;
    create(transaction: CreateTransactionDto, currentUser: UserEntity):Promise<ResData<TransactionEntity>>;
    update(id: ID, transaction: UpdateTransactionDto, currentUser: UserEntity): Promise<ResData<TransactionEntity>>;
}