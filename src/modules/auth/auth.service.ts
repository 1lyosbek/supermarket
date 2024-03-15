import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginOrPasswordWrongException } from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { hashed, compare } from 'src/lib/bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/enum';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IUserService") private readonly userService: UserService,
    @Inject("IUserRepository") private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      dto.login,
    );

    if (!foundUser) {
      throw new LoginOrPasswordWrongException();
    }

    const compared = await compare(dto.password, foundUser.password);
    if (!compared) {
       throw new LoginOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }

  async register(dto: RegisterDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      dto.login,
    );

    if (foundUser) {
      throw new LoginOrPasswordWrongException();
    } 
    dto.password = await hashed(dto.password);
    
    const newUser = new UserEntity();
    newUser.login = dto.login;
    newUser.password = dto.password;
    newUser.fullName = dto.fullName;
    newUser.role = dto.role;

    const savedUser = await this.userRepository.createUser(newUser);

    await this.cacheManager.del(RedisKeys.USERS)
    const token = await this.jwtService.signAsync({ id: savedUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: savedUser,
      token,
    });
  
}
}
