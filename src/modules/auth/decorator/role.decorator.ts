import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/common/consts/const';
import { RoleEnum } from 'src/common/enums/enum';

export const RoleDecorator = (...roles: Array<RoleEnum>) =>
  SetMetadata(ROLES_KEY, roles);
