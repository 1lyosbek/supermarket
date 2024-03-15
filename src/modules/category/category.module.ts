import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    {provide :"ICategoryService", useClass : CategoryService},
    {provide :"ICategoryRepository", useClass : CategoryRepository},
  ],
})
export class CategoryModule {}

