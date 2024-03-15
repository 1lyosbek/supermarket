import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/shared/guards/auth.guard';
import { RolesGuard } from 'src/modules/shared/guards/role.guard';
import { RoleEnum } from '../enums/enum';
import { ROLES_KEY } from 'src/common/consts/const';

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBadRequestResponse({description: "Bad Request"}),
    ApiOkResponse({description: "OK"}),
    ApiForbiddenResponse({description: "Forbidden resource"}),
  );
}