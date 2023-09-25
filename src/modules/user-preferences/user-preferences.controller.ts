import { Get, Controller, UseGuards, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/modules/auth/jwt-auth.guard';
import { User } from '../../shared/modules/auth/jwt-strategy';
import { BodySchema  } from '../../shared/pipes/validation';
import { UserPreferencesBody, usersPreferencesBody } from './dtos/user-preferences.dto';
import { UserPreferencesService } from './user-preferences.service';

@Controller('users')
@ApiTags('Users')
@ApiSecurity('x-access-token')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController{
  public constructor(
    public userPreferencesService: UserPreferencesService
  ){}

  @Get('/preferences')
  public async findUserPreferences(
    @User()
    userId: string
  ) {
    return this.userPreferencesService.findUserPreferences(userId);
  }

  @Post('/preferences')
  public async createUserPreferences(
    @User()
    userId: string,
    @BodySchema(usersPreferencesBody)
    preferences: UserPreferencesBody
  ) {
    return this.userPreferencesService.createOrUpdateUserPreferences(userId, preferences);
  }

  @Put('/preferences')
  public async updateUserPreferences(
    @User()
    userId: string,
    @BodySchema(usersPreferencesBody)
    preferences: UserPreferencesBody
  ) {
    return this.userPreferencesService.createOrUpdateUserPreferences(userId, preferences);
  }

  @HttpCode(204)
  @Delete('/preferences')
  public async deleteUserPreferences(
    @User()
    userId: string
  ) {
    return this.userPreferencesService.deleteUserPreferences(userId);
  }

}
