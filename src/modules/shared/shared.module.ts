import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
  {provide : "IUserRepository", useClass: UserRepository},
  {provide : "IUserService", useClass: UserService}
  ],
  exports: [
  {provide : "IUserRepository", useClass: UserRepository},
  {provide : "IUserService", useClass: UserService}
],
})
export class SharedModule {}
