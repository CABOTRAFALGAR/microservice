import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { UserProjectPreferencesBody, FindProjectParams, UserProjectPreferencesParsed } from '../../../src/modules/user-project-preferences/dtos/user-project-preferences.dto';
import { UserProjectPreferencesService } from '../../../src/modules/user-project-preferences/user-project-preferences.service';
import { UserProjectPreferencesController } from '../../../src/modules/user-project-preferences/user-project-preferences.controller';

const userId = faker.datatype.uuid();

const projectId = faker.datatype.uuid();

const params: FindProjectParams = {
  projectId
};

const userProjectPreferencesBody: UserProjectPreferencesBody = {
  renderingOptions: {
    specShading:faker.datatype.boolean(),
    showBackfacingFaces: faker.datatype.boolean(),
    enableSSAO: faker.datatype.boolean(),
    enableTweaksCW: faker.datatype.boolean(),
    enableTweaksMW: faker.datatype.boolean()
  }
};

const userProjectPreferencesResult: UserProjectPreferencesParsed = {
  userId,
  projectId,
  data: userProjectPreferencesBody
};

describe('User project preferences controller', () => {
  let controller: UserProjectPreferencesController;
  let mockUserProjectPreferencesService: jest.Mocked<UserProjectPreferencesService>;

  beforeEach(async () => {
    mockUserProjectPreferencesService = {
      findUserProjectPreferences: jest.fn(),
      createOrUpdateUserProjectPreferences: jest.fn(),
      deleteUserProjectPreferences: jest.fn()
    } as any as jest.Mocked<UserProjectPreferencesService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ UserProjectPreferencesController ],
      providers: [
        {
          provide: UserProjectPreferencesService,
          useValue: mockUserProjectPreferencesService
        }
      ]
    }).compile();

    controller = module.get<UserProjectPreferencesController>(UserProjectPreferencesController);
  });

  describe('Unit Tests user project preferences Controller', () => {
    it('Find user project preferences.', async () => {
      mockUserProjectPreferencesService.findUserProjectPreferences.mockResolvedValueOnce(userProjectPreferencesResult);

      const result: UserProjectPreferencesParsed = await controller.findUserPreferences(userId, params);

      expect(result).toEqual(userProjectPreferencesResult);
    });

    it('Create user project preferences.', async () => {
      mockUserProjectPreferencesService.createOrUpdateUserProjectPreferences.mockResolvedValueOnce(userProjectPreferencesResult);

      const result = await controller.createUserProjectPreferences(userId, params, userProjectPreferencesBody);

      expect(result).toEqual(userProjectPreferencesResult);
    });

    it('Update user project preferences.', async () => {
      mockUserProjectPreferencesService.createOrUpdateUserProjectPreferences.mockResolvedValueOnce(userProjectPreferencesResult);

      const result = await controller.updateUserProjectPreferences(userId, params, userProjectPreferencesBody);

      expect(result).toEqual(userProjectPreferencesResult);
    });

    it('Delete user project preferences.', async () => {
      const resultDelete: DeleteResult = {
        raw: faker.datatype.json(),
        affected: 1
      };

      mockUserProjectPreferencesService.deleteUserProjectPreferences.mockResolvedValueOnce(resultDelete);

      const result = await controller.deleteUserProjectPreferences(userId, params);

      expect(result.affected).toBe(1);
    });
  });
});
