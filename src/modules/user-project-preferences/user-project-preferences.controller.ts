import { Get, Controller, UseGuards, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/modules/auth/jwt-auth.guard';
import { User } from '../../shared/modules/auth/jwt-strategy';
import { BodySchema, ParamSchema  } from '../../shared/pipes/validation';
import { UserProjectPreferencesService } from './user-project-preferences.service';
import {
  FindProjectParams, findProjectParams,
  UserProjectPreferencesBody, userProjectPreferencesBody
} from './dtos/user-project-preferences.dto';

@Controller('users/projects')
@ApiTags('Users')
@ApiSecurity('x-access-token')
@UseGuards(JwtAuthGuard)
export class UserProjectPreferencesController{
  public constructor(
    public userProjectPreferencesService: UserProjectPreferencesService
  ) {}

  @Get(':projectId/preferences')
  public async findUserPreferences(
    @User()
    userId: string,
    @ParamSchema(findProjectParams)
    params: FindProjectParams
  ) {
    return this.userProjectPreferencesService.findUserProjectPreferences(userId, params.projectId);
  }

  @Post(':projectId/preferences')
  public async createUserProjectPreferences(
    @User()
    userId: string,
    @ParamSchema(findProjectParams)
    params: FindProjectParams,
    @BodySchema(userProjectPreferencesBody)
    preferences: UserProjectPreferencesBody
  ) {
    return this.userProjectPreferencesService.createOrUpdateUserProjectPreferences(userId, params.projectId, preferences);
  }

  @Put(':projectId/preferences')
  public async updateUserProjectPreferences(
    @User()
    userId: string,
    @ParamSchema(findProjectParams)
    params: FindProjectParams,
    @BodySchema(userProjectPreferencesBody)
    preferences: UserProjectPreferencesBody
  ) {
    return this.userProjectPreferencesService.createOrUpdateUserProjectPreferences(userId, params.projectId, preferences);
  }

  @HttpCode(204)
  @Delete(':projectId/preferences')
  public async deleteUserProjectPreferences(
    @User()
    userId: string,
    @ParamSchema(findProjectParams)
    params: FindProjectParams
  ) {
    return this.userProjectPreferencesService.deleteUserProjectPreferences(userId, params.projectId);
  }

}
