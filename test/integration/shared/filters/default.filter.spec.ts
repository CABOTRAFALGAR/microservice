import { Get, BadRequestException, Controller, UnauthorizedException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import axios from 'axios';
import * as nock from 'nock';
import { AllExceptionsFilter, FSException, RequestException } from '../../../../src/shared/filters/default.filter';

const TEST_SERVICE_HOST = 'http://test-service:3000';

@Controller('errors')
class TestController {
  @Get('nestJS')
  public async getNestJSError() {
    throw new BadRequestException();
  }

  @Get('axios')
  public async getAxiosError() {
    await axios.get('/', { baseURL: TEST_SERVICE_HOST });
  }

  @Get('axiosUnauthorized')
  public async getAxiosUnauthorizedError() {
    throw new UnauthorizedException();
  }

  @Get('accessErrors')
  public async getAccessError() {
    const error: FSException = {
      code: 'ENOENT',
      name: 'test',
      message: 'request test'
    };

    throw error;
  }

  @Get('requestErrors')
  public async getRequestError() {
    const error: RequestException = {
      statusCode: '400',
      name: 'test',
      message: 'request test'
    };

    throw error;
  }

  @Get('generic')
  public async getGenericError() {
    throw new Error('fail');
  }
}

describe('defaultFilterSpec', () => {
  let app;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ TestController ]
    }).compile();

    app = moduleRef.createNestApplication();

    const httpAdapter = app.get(HttpAdapterHost);

    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle Axios errors', async () => {
    nock(TEST_SERVICE_HOST)
      .get('/')
      .reply(400);

    await request(app.getHttpServer())
      .get('/errors/axios')
      .expect(400);
  });

  it('should handle NestJS handler errors', async () => {
    await request(app.getHttpServer())
      .get('/errors/nestJS')
      .expect(400);
  });

  it('should handle NestJS middleware errors', async () => {
    await request(app.getHttpServer())
      .get('/errors/axiosUnauthorized')
      .expect(401);
  });

  it('should handle file access errors', async () => {
    await request(app.getHttpServer())
      .get('/errors/accessErrors')
      .expect(404);
  });

  it('should handle request response errors', async () => {
    await request(app.getHttpServer())
      .get('/errors/requestErrors')
      .expect(400);
  });

  it('should handle generic errors', async () => {
    await request(app.getHttpServer())
      .get('/errors/generic')
      .expect(500);
  });
});
