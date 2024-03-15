import { ID } from "src/common/types/type";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductEntity } from "../entities/product.entity"; 
import { ResData } from "src/lib/resData";
import { CreateProductDto } from "../dto/create-product.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";

export interface IProductService{
    create(product: CreateProductDto): Promise<ResData<ProductEntity>>;
    findAll(): Promise<ResData<ProductEntity[]>>;
    findOne(id: ID): Promise<ResData<ProductEntity>>;
    update(id: ID, product: UpdateProductDto, currentUser: UserEntity): Promise<ResData<ProductEntity>>;
    remove(id: ID): Promise<ResData<ProductEntity>>;
}