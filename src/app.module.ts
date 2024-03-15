import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/entities/user.entity';
import { Category } from './modules/category/entities/category.entity';
import { ProductEntity } from './modules/product/entities/product.entity';
import { TransactionEntity } from './modules/transaction/entities/transaction.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { FileModule } from './modules/file/file.module';
import { FileEntity } from './modules/file/entities/file.entity';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {host: '127.0.0.1', port: 6379},
          ttl: 10 * 1000,
        });
        return {store}
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '22$$iiII',
      database: 'product_typeorm',
      entities: [UserEntity, Category, ProductEntity, TransactionEntity, FileEntity],
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
    TransactionModule,
    UserModule,
    FileModule,
  ],
})
export class AppModule {}
