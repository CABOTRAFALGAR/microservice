import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserProjectPreferencesEntity } from '../../../src/modules/user-project-preferences/entities/user-project-preferences.entity';
import { UserProjectPreferencesService } from '../../../src/modules/user-project-preferences/user-project-preferences.service';

describe('UserProjectPreferencesService', () => {
  let service: UserProjectPreferencesService;
  let mockUserProjectPreferencesRepository: jest.Mocked<Pick<Repository<UserProjectPreferencesEntity>, 'findOneBy' | 'save' | 'delete'>>;

  beforeEach(async () => {
    mockUserProjectPreferencesRepository = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      delete: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProjectPreferencesService,
        {
          provide: getRepositoryToken(UserProjectPreferencesEntity),
          useValue: mockUserProjectPreferencesRepository
        }
      ]
    }).compile();
    service = module.get<UserProjectPreferencesService>(UserProjectPreferencesService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get user project preferences', () => {
    it('should retrieve user project preferences', async () => {
      const userId = 'test';
      const projectId = 'test';
      let userProjectPreferences = {
        userId,
        projectId,
        data: JSON.stringify({
          renderingOptions: {
            specShading: true,
            showBackfacingFaces: true,
            enableSSAO: true,
            enableTweaksCW: true,
            enableTweaksMW: true
          }
        })
      };

      mockUserProjectPreferencesRepository.findOneBy.mockResolvedValueOnce(userProjectPreferences);

      const findsersProjectPreferences = await service.findUserProjectPreferences(userId, projectId);

      expect(findsersProjectPreferences).toEqual(userProjectPreferences);
    });

    it('should create empty user project preferences if none exist', async () => {
      mockUserProjectPreferencesRepository.findOneBy.mockResolvedValueOnce(null);
      mockUserProjectPreferencesRepository.save.mockResolvedValueOnce({
        userId: 'test',
        projectId: 'test',
        data: 'null'
      });

      await service.findUserProjectPreferences('userIdTest', 'projectIdTest');

      expect(mockUserProjectPreferencesRepository.save).toHaveBeenCalled();
    });
  });

  describe('Create or update user project preferences', () => {
    it('should save user project preferences', async () => {
      const userId = 'test';
      const projectId = 'test';
      const preferences = {
        renderingOptions: {
          specShading: true,
          showBackfacingFaces: true,
          enableSSAO: true,
          enableTweaksCW: true,
          enableTweaksMW: true
        }
      };

      const entity = new UserProjectPreferencesEntity();
      entity.userId = userId;
      entity.projectId = projectId;
      entity.data = JSON.stringify(preferences);

      mockUserProjectPreferencesRepository.save.mockResolvedValueOnce(entity);

      const result = await service.createOrUpdateUserProjectPreferences(userId, projectId, preferences);

      expect(result).toEqual(entity);
    });
  });

  describe('Delete user project preferences', () => {
    it('should delete user project preferences', async () => {
      const userId = 'test';
      const projectId = 'test';
      let userProjectPreferences = {
        userId: userId,
        projectId: projectId,
        data: JSON.stringify({
          renderingOptions: {
            specShading: true,
            showBackfacingFaces: true,
            enableSSAO: true,
            enableTweaksCW: true,
            enableTweaksMW: true
          }
        })
      };
      const resultDelete: DeleteResult = {
        raw: faker.datatype.json(),
        affected: 1
      };

      mockUserProjectPreferencesRepository.findOneBy.mockResolvedValueOnce(userProjectPreferences);
      mockUserProjectPreferencesRepository.delete.mockResolvedValueOnce(resultDelete);

      const result = await service.deleteUserProjectPreferences(userId, projectId);

      expect(result).toEqual(resultDelete);
    });

    it('Delete user project preferences. Throws an error when finding the user preferences it doesn\'t receive a response.', async () => {
      const mockFindOneBy = jest.fn();

      try {
        mockUserProjectPreferencesRepository.findOneBy = mockFindOneBy.mockReturnValueOnce(null);
        await service.deleteUserProjectPreferences('userIdTest', 'projectIdTest');
      } catch (e) {
        const error = e as Error;

        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

});
