import { ID } from "src/common/types/type";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { Category } from "../entities/category.entity";

export interface ICategoryRepository{
    createCategory(category: Category): Promise<Category>;
    findAllCategories(): Promise<Category[]>;
    findCategoryById(id: ID): Promise<Category | undefined>;
    updateCategory(category: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: ID): Promise<Category | undefined>;
    findCategoryByName(name: string): Promise<Category | undefined>;
}