import {
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUserService } from './interfaces/u.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(@Inject("IUserService") private readonly userService: IUserService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.USERS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

 
  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }
}
