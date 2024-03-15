import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RedisKeys, RoleEnum } from 'src/common/enums/enum';
import { UserEntity } from '../user/entities/user.entity';
import { CurrentUser } from 'src/common/decorator/CurrentUser.decorator';
import { IProductService } from './interfaces/p.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';


@ApiTags("product")
@Controller('product')
export class ProductController {
  constructor(@Inject("IProductService") private readonly productService: IProductService) {}


  @Auth(RoleEnum.ADMIN, RoleEnum.BOSS)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.PRODUCTS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.ADMIN, RoleEnum.WORKER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUser() currentUser: UserEntity) {
    return this.productService.update(+id, updateProductDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
