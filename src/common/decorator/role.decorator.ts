import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/common/consts/const';
import { RoleEnum } from '../enums/enum';

export const RoleDecorator = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);