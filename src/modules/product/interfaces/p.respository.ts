import { ID } from "src/common/types/type";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductEntity } from "../entities/product.entity"; 

export interface IProductRepository{
    createProduct(category: ProductEntity): Promise<ProductEntity>;
    findAllProducts(): Promise<ProductEntity[]>;
    findProductById(id: ID): Promise<ProductEntity | undefined>;
    updateProduct(product: UpdateProductDto): Promise<ProductEntity>;
    deleteProduct(id: ID): Promise<ProductEntity | undefined>;
}