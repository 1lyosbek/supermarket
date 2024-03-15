import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './interfaces/p.service';
import { IProductRepository } from './interfaces/p.respository';
import { ResData } from 'src/lib/resData';
import { ProductEntity } from './entities/product.entity';
import { ID } from 'src/common/types/type';
import { ProductNotFoundException } from './exception/p.exception';
import { ICategorySevice } from '../category/interfaces/c.service';
import { UserEntity } from '../user/entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/enum';

@Injectable()

export class ProductService implements IProductService {
  constructor(
    @Inject("IProductRepository") private readonly repositoryService: IProductRepository,
    @Inject("ICategoryService") private readonly categoryService: ICategorySevice,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<ResData<ProductEntity>> {
    const {data: foundCategory} = await this.categoryService.findCategoryById(createProductDto.categoryId);  
    const product = new ProductEntity();
    const newProduct = Object.assign(product, createProductDto);
    newProduct.category = foundCategory;
    const res = await this.repositoryService.createProduct(newProduct);
    await this.cacheManager.del(RedisKeys.PRODUCTS)
    return new ResData<ProductEntity>("Product created successfully", 201, res);
  }
  async findAll(): Promise<ResData<ProductEntity[]>> {
    const result = await this.repositoryService.findAllProducts();
    return new ResData<ProductEntity[]>("Products", 200, result);
  }
  async findOne(id: ID): Promise<ResData<ProductEntity>> {
    const result = await this.repositoryService.findProductById(id);
    if (!result) {
      throw new ProductNotFoundException()
    }
    return new ResData<ProductEntity>("Product", 200, result);
  }
  async update(id: ID, updateProductDto: UpdateProductDto, currenUser: UserEntity): Promise<ResData<ProductEntity>> {
    const {data :foundProduct } = await this.findOne(id);
    const  update = Object.assign(foundProduct, updateProductDto);
    update.lastEditedBy = currenUser;
    const updatedProduct = await this.repositoryService.updateProduct(update)
    await this.cacheManager.del(RedisKeys.PRODUCTS)
    return  new ResData<ProductEntity>("updatedProduct", 200, updatedProduct);
  }
  async remove(id: ID): Promise<ResData<ProductEntity>> {
    const foundProduct = await this.findOne(id);
    const result = await this.repositoryService.deleteProduct(id);
    await this.cacheManager.del(RedisKeys.PRODUCTS)
    return new ResData<ProductEntity>("Product deleted successfully", 200, result);
  }
}
