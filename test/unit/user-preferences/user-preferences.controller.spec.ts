import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { UserPreferencesBody, UserPreferencesParsed } from '../../../src/modules/user-preferences/dtos/user-preferences.dto';
import { UserPreferencesService } from '../../../src/modules/user-preferences/user-preferences.service';
import { UserPreferencesController } from '../../../src/modules/user-preferences/user-preferences.controller';

const userId = faker.datatype.uuid();

const userPreferencesBody: UserPreferencesBody = {
  toolsPreferences: {
    showCameraToolbar: faker.datatype.boolean(),
    showMaterialStackTool: faker.datatype.boolean(),
    showSelectionTool: faker.datatype.boolean(),
    showMaterialCallout: faker.datatype.boolean(),
    showReviewModeColorCallout: faker.datatype.boolean()
  }
};

const userPreferencesResult: UserPreferencesParsed = {
  userId,
  data: userPreferencesBody
};

describe('User preferences controller', () => {
  let controller: UserPreferencesController;
  let mockUserPreferencesService: jest.Mocked<UserPreferencesService>;

  beforeEach(async () => {
    mockUserPreferencesService = {
      findUserPreferences: jest.fn(),
      createOrUpdateUserPreferences: jest.fn(),
      deleteUserPreferences: jest.fn()
    } as any as jest.Mocked<UserPreferencesService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ UserPreferencesController ],
      providers: [
        {
          provide: UserPreferencesService,
          useValue: mockUserPreferencesService
        }
      ]
    }).compile();

    controller = module.get<UserPreferencesController>(UserPreferencesController);
  });

  describe('Unit Tests user preferences Controller', () => {
    it('Find user preferences.', async () => {
        mockUserPreferencesService.findUserPreferences.mockResolvedValueOnce(userPreferencesResult);

        const result = await controller.findUserPreferences(userId);

        expect(result).toEqual(userPreferencesResult);
    });

    it('Create user preferences.', async () => {
      mockUserPreferencesService.createOrUpdateUserPreferences.mockResolvedValueOnce(userPreferencesResult);

      const result = await controller.createUserPreferences(userId, userPreferencesBody);

      expect(result).toEqual(userPreferencesResult);
    });

    it('Update user preferences.', async () => {
      mockUserPreferencesService.createOrUpdateUserPreferences.mockResolvedValueOnce(userPreferencesResult);

      const result = await controller.updateUserPreferences(userId, userPreferencesBody);

      expect(result).toEqual(userPreferencesResult);
    });

    it('Delete user preferences.', async () => {
      const resultDelete: DeleteResult = {
        raw: faker.datatype.json(),
        affected: 1
      };

      mockUserPreferencesService.deleteUserPreferences.mockResolvedValueOnce(resultDelete);

      const result = await controller.deleteUserPreferences(userId);

      expect(result.affected).toBe(1);
    });
  });
});
