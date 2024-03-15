import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRespository } from './transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { CountExceptions, TransactionNotFoundException } from './exception/t.exception';
import { UserEntity } from '../user/entities/user.entity';
import { ITransactionService } from './interfaces/t.service';
import { ResData } from 'src/lib/resData';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/enum';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject("IUserService") private readonly userservice: UserService,
    @Inject("IProductService") private readonly producService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly repository: TransactionRespository
    ) {
    
  }
  async create(createTransactionDto: CreateTransactionDto, currentUser: UserEntity): Promise<ResData<TransactionEntity>> {
    console.log(createTransactionDto);
    const {data: foundUser} = await this.userservice.findOneById(createTransactionDto.userId);
    const {data: foundProduct} = await this.producService.findOne(createTransactionDto.productId);
    if (foundProduct.count < 0 || foundProduct.count < createTransactionDto.count) {
      throw new CountExceptions()
    }
    foundProduct.count = foundProduct.count - createTransactionDto.count;
    const newTransaction = new TransactionEntity()
    newTransaction.createdBy = currentUser;
    newTransaction.totalPrice = foundProduct.price * createTransactionDto.count;
    const created = Object.assign(newTransaction, createTransactionDto);
    const createdTransaction = await this.repository.create(created, foundProduct)
    await this.cacheManager.del(RedisKeys.TRANSACTIONS)
    return new ResData<TransactionEntity>("transaction created", 201, createdTransaction);
  }

  async findAll():Promise<ResData<TransactionEntity[]>>  {
    const foundTransactions = await this.repository.findAllTransactions();
    return new ResData<TransactionEntity[]>("transactions", 200, foundTransactions);
  }

  async findOneByUserId(id: number):Promise<ResData<TransactionEntity[]>> {
    const foundTransaction = await this.repository.findOneByUserId(id);    
    return new ResData<TransactionEntity[]>("found transactions by userId", 200, foundTransaction);
  }

  async findOneByProductId(id: number): Promise<ResData<TransactionEntity[]>> {
    const foundTransaction = await this.repository.findOneByProductId(id);    
    return new ResData<TransactionEntity[]>("found transactions by productId", 200, foundTransaction);
  }

  async findOneById(id: number): Promise<ResData<TransactionEntity>> {
    const foundTransaction = await this.repository.findOneById(id); 
    if (!foundTransaction) {
      throw new TransactionNotFoundException()
    }   
    return new ResData<TransactionEntity>("found transactions by id", 200, foundTransaction);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto, currentUser: UserEntity):Promise<ResData<TransactionEntity>> {
    const foundTransaction = await this.repository.findOneById(id);
    const {data: foundUser} = await this.userservice.findOneById(updateTransactionDto.userId);
    const {data: foundProduct} = await this.producService.findOne(updateTransactionDto.productId);
    if (foundProduct.count < 0 || foundProduct.count < updateTransactionDto.count) {
      throw new CountExceptions()
    }
    foundProduct.count = foundProduct.count - updateTransactionDto.count;
    const updateTransaction = Object.assign(foundTransaction, updateTransactionDto);
    updateTransaction.totalPrice = foundProduct.price * updateTransactionDto.count;
    updateTransaction.lastEditedBy = currentUser;
    const updated = await this.repository.update(updateTransaction);
    await this.cacheManager.del(RedisKeys.TRANSACTIONS)
    return new ResData<TransactionEntity>("transactions updated", 200, updated);
  }

  async remove(id: number):Promise<ResData<TransactionEntity>> {
    const foundTransaction = await this.repository.findOneById(id);
    const deleted = await this.repository.delete(id);
    await this.cacheManager.del(RedisKeys.TRANSACTIONS)
    return new ResData<TransactionEntity>("transactions deleted", 200, deleted);
  }
}
