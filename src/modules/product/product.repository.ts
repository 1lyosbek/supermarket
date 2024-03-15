import { InjectRepository } from "@nestjs/typeorm";
import { IProductRepository } from "./interfaces/p.respository";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { ID } from "src/common/types/type";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Category } from "../category/entities/category.entity";

export class ProductRepository implements IProductRepository {
    constructor(
        @InjectRepository(ProductEntity) private repository: Repository<ProductEntity>,
    ) {}
    async createProduct(category: ProductEntity): Promise<ProductEntity> {
        return await this.repository.save(category);
    }
    async findAllProducts(): Promise<ProductEntity[]> {
        return await this.repository.find({relations: ['category']});
    }
    async findProductById(id: ID): Promise<ProductEntity | undefined> {
        return await this.repository.findOneBy({id});
    }
    async updateProduct(product: UpdateProductDto): Promise<ProductEntity> {
        return await this.repository.save(product);
    }
    async deleteProduct(id: ID): Promise<ProductEntity | undefined> {
        const foundProduct = await this.repository.findOneBy({id});
        await this.repository.delete(id);
        return foundProduct;
    }
}
