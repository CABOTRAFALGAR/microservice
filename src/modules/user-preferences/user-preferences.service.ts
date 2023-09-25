import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreferencesBody, UserPreferencesParsed } from './dtos/user-preferences.dto';
import { UserPreferencesEntity } from './entities/user-preferences.entity';

@Injectable()
export class UserPreferencesService {
  public constructor(
    @InjectRepository(UserPreferencesEntity)
    private readonly userPreferencesRepository: Repository<UserPreferencesEntity>
  ) {}

  public async findUserPreferences(userId: string) {
    let result = await this.userPreferencesRepository.findOneBy({ userId });

    if (!result) {
      return this.createOrUpdateUserPreferences(userId, {});
    }

    result.data = JSON.parse(result.data);

    return result as UserPreferencesParsed;
  }

  public async createOrUpdateUserPreferences(userId: string, preferences: UserPreferencesBody) {
    const entity = new UserPreferencesEntity();

    entity.userId = userId;
    entity.data = JSON.stringify(preferences);

    const result = await this.userPreferencesRepository.save(entity);

    result.data = JSON.parse(result.data);

    return result as UserPreferencesParsed;
  }

  public async deleteUserPreferences(userId: string) {
    return this.userPreferencesRepository.delete(userId);
  }
}
