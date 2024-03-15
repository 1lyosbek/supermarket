import { InjectRepository } from "@nestjs/typeorm";
import { ICategoryRepository } from "./interfaces/c.repository";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ID } from "src/common/types/type";

export class CategoryRepository implements ICategoryRepository {
    constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
    async createCategory(category: Category): Promise<Category> {
        const newCategory = this.categoryRepository.create(category)
        return await this.categoryRepository.save(newCategory);
    }
    async findAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }
    async findCategoryById(id: ID): Promise<Category> {
        return await this.categoryRepository.findOneBy({id});
    }
    findCategoryByName(name: string): Promise<Category> {
        return this.categoryRepository.findOneBy({name});
    }
    async updateCategory(category: UpdateCategoryDto): Promise<Category> { 
        return  await this.categoryRepository.save(category);
    }
    async deleteCategory(id: ID): Promise<Category | undefined> {
        const foundCategory = await this.categoryRepository.findOneBy({id})
        await this.categoryRepository.delete(id);
        return foundCategory
    }
}