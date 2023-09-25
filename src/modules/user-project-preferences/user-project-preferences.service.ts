import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProjectPreferencesBody, UserProjectPreferencesParsed } from './dtos/user-project-preferences.dto';
import { UserProjectPreferencesEntity } from './entities/user-project-preferences.entity';

@Injectable()
export class UserProjectPreferencesService {
  public constructor(
    @InjectRepository(UserProjectPreferencesEntity)
    private readonly userProjectPreferencesRepository: Repository<UserProjectPreferencesEntity>
  ) {}


  public async findUserProjectPreferences(userId: string, projectId: string) {
    const result = await this.userProjectPreferencesRepository.findOneBy({ userId, projectId });

    if (!result) {
      return this.createOrUpdateUserProjectPreferences(userId, projectId, {});
    }

    result.data = JSON.parse(result.data);

    return result as UserProjectPreferencesParsed;
  }

  public async createOrUpdateUserProjectPreferences(userId: string, projectId: string, preferences: UserProjectPreferencesBody) {
    const entity = new UserProjectPreferencesEntity();

    entity.userId = userId;
    entity.projectId = projectId;
    entity.data = JSON.stringify(preferences);

    const result = await this.userProjectPreferencesRepository.save(entity);

    result.data = JSON.parse(result.data);

    return result as UserProjectPreferencesParsed;
  }

  public async deleteUserProjectPreferences(userId: string, projectId: string) {
    const result = await this.userProjectPreferencesRepository.findOneBy({ userId, projectId });

    if (!result) {
      throw new NotFoundException();
    }

    return this.userProjectPreferencesRepository.delete(result);
  }
}
