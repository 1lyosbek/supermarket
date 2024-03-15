import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRespository } from './transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from '../product/product.service';
import { ProductEntity } from '../product/entities/product.entity';
import { ProductRepository } from '../product/product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, ProductEntity, Category]), SharedModule],
  controllers: [TransactionController],
  providers: [
  TransactionService, TransactionRespository,
  {provide: "IProductService", useClass: ProductService},
  {provide: "IProductRepository", useClass: ProductRepository},
  {provide :"ICategoryService", useClass : CategoryService},
  {provide :"ICategoryRepository", useClass : CategoryRepository},
  ],
})
export class TransactionModule {}
