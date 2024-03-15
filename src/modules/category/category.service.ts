import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ID } from 'src/common/types/type';
import { ICategorySevice } from './interfaces/c.service';
import { ResData } from 'src/lib/resData';
import { ICategoryRepository } from './interfaces/c.repository';
import { CategoryNotFoundException } from './exception/c.exception';

@Injectable()
export class CategoryService implements ICategorySevice {
  constructor(@Inject("ICategoryRepository") private readonly categoryRepository :ICategoryRepository) {
    
  }
  async create(createCategoryDto: CreateCategoryDto): Promise<ResData<Category>>{
    const category = new Category();
    const newCategory = Object.assign(category, createCategoryDto)
    const result = await this.categoryRepository.createCategory(newCategory);
    return new ResData<Category>("Category created sucessfully", 201, result);
  }

  async findAll(): Promise<ResData<Category[]>>{
    const result = await this.categoryRepository.findAllCategories();
    return new ResData<Category[]>("all categories", 200, result);
  }

  async findCategoryById(id: ID): Promise<ResData<Category | undefined>>{
    const result = await this.categoryRepository.findCategoryById(id);
    if (!result) {
      throw new CategoryNotFoundException()
    }
    return new ResData<Category>("Category found succesfully", 200, result);
  }

  async findCategoryByName(name: string): Promise<ResData<Category>> {
    const foundCategory = await this.categoryRepository.findCategoryByName(name)
    const resData = new ResData(" ", 200, foundCategory)
    if (!foundCategory) {
      resData.message = "Category not found"
      resData.statusCode = 404
    }
    return resData;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ResData<Category>> {
    const {data :foundCategory} = await this.findCategoryById(id);
    const updated = Object.assign(foundCategory, updateCategoryDto)
    const result = await this.categoryRepository.updateCategory(updated);
    return new ResData<Category>("Category updated successfully", 200, result);
  }

  async remove(id: number): Promise<ResData<Category>> {
    const foundCategory = await this.findCategoryById(id);
    const result = await this.categoryRepository.deleteCategory(id);
    return new ResData<Category>("Category removed successfully", 200, result);
  }
}
