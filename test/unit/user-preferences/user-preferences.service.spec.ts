import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { UserPreferencesEntity } from '../../../src/modules/user-preferences/entities/user-preferences.entity';
import { UserPreferencesService } from '../../../src/modules/user-preferences/user-preferences.service';
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
describe('UserPreferencesService', () => {
  let service: UserPreferencesService;
  let mockUsersPreferencesRepository;

  beforeEach(async () => {
    mockUsersPreferencesRepository = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      delete: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferencesService,
        {
          provide: getRepositoryToken(UserPreferencesEntity),
          useValue: mockUsersPreferencesRepository
        }
      ]
    }).compile();

    service = module.get<UserPreferencesService>(UserPreferencesService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find user preferences', () => {
    it('Returns all user preferences', async () => {
      const mockFindOneBy = jest.fn();

      const userId = 'test';
      let userPreferences = {
        userId,
        data: JSON.stringify({
          toolsPreferences: {
            showSelectionTool: true,
            showMaterialStackTool: true,
            showMaterialCallout: true,
            showCameraToolbar: true
          }
        })
      };

      mockUsersPreferencesRepository.findOneBy = mockFindOneBy.mockReturnValueOnce(userPreferences);

      const findUsersProjects = await service.findUserPreferences(userId);

      expect(findUsersProjects).toEqual(userPreferences);
    });
    it('Creates user preferences because it doesn\'t find any', async () => {
      const mockFindOneBy = jest.fn();

      const userId = 'test';
      const preferences = {
        toolsPreferences: {
          showSelectionTool: true,
          showMaterialStackTool: true,
          showMaterialCallout: true,
          showCameraToolbar: true
        }
      };

      const entity = new UserPreferencesEntity();
      entity.userId = userId;
      entity.data = JSON.stringify(preferences);

      mockUsersPreferencesRepository.findOneBy = mockFindOneBy.mockReturnValueOnce(null);
      mockUsersPreferencesRepository.save.mockResolvedValueOnce(entity as any);

      const findUsersProjects = await service.findUserPreferences(userId);

      expect(findUsersProjects).toEqual(entity);
    });
  });

  describe('Creating or updating user preferences', () => {
    it('Save user preferences', async () => {
      const userId = 'test';
      const preferences = {
        toolsPreferences: {
          showSelectionTool: true,
          showMaterialStackTool: true,
          showMaterialCallout: true,
          showCameraToolbar: true
        }
      };

      const entity = new UserPreferencesEntity();
      entity.userId = userId;
      entity.data = JSON.stringify(preferences);

      mockUsersPreferencesRepository.save.mockResolvedValueOnce(entity);

      const result = await service.createOrUpdateUserPreferences(userId, JSON.parse(JSON.stringify(preferences)));

      expect(result).toEqual(entity);
    });
  });

  describe('Deleting user preferences', () => {
    it('Delete user preferences', async () => {
      const userId = 'test';
      const resultDelete: Partial<DeleteResult> = { affected: 1 };

      mockUsersPreferencesRepository.delete.mockReturnValueOnce(resultDelete);

      const result = await service.deleteUserPreferences(userId);

      expect(result).toEqual(resultDelete);
    });
  });

});
