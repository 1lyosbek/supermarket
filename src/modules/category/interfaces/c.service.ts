import { ID } from "src/common/types/type";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { Category } from "../entities/category.entity";
import { ResData } from "src/lib/resData";

export interface ICategorySevice {
    create(category: Category): Promise<ResData<Category>>;
    findAll(): Promise<ResData<Category[]>>;
    findCategoryById(id: ID): Promise<ResData<Category>>;
    update(id: ID, category: UpdateCategoryDto): Promise<ResData<Category>>;
    remove(id: ID): Promise<ResData<Category>>;
    findCategoryByName(name: string): Promise<ResData<Category | undefined>>;
}