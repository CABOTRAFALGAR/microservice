import { logger } from 'http-logging-core';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import axios, { AxiosError } from 'axios';

interface AWSException extends Error {
  $response: AWSResponse;
}

interface AWSResponse {
  status: number;
  body: string;
}

export interface FSException extends Error {
  code: string;
}

export interface RequestException extends Error {
  statusCode?: string;
  code?: string;
}

const isAWSException = (exception: any): exception is AWSException => '$response' in exception;
const isFSException = (exception: any): exception is FSException => (exception as FSException).code === 'ENOENT';
const isRequestException = (exception: any): exception is RequestException => 'statusCode' in exception || 'code' in exception;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: AxiosError | HttpException | AWSException | FSException | Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    let responseBody: any = '';
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    if (axios.isAxiosError(exception)) {
      // handle Axios errors
      logger.error(exception.response.data.toString() || exception.message);
      httpStatus = exception.response.status;
      responseBody = exception.response.data;
    } else if (exception instanceof HttpException) {
      // handle NestJS errors
      logger.error('', exception.getResponse());
      httpStatus = exception.getStatus();
      responseBody = exception.getResponse();
    } else if (isAWSException(exception)) {
      // handle AWS error
      logger.error(exception.message, exception.$response.body);
      httpStatus = exception.$response.status;
      responseBody = exception.$response.body;
    } else if (isFSException(exception)) {
      // handle FS error
      httpStatus = HttpStatus.NOT_FOUND;
    } else if (isRequestException(exception)) {
      // handle potentially nasuni / request error
      logger.error(exception.message);
      httpStatus = parseInt(exception.statusCode) || parseInt(exception.code);
      responseBody = exception.message;
    } else {
      // fallback to 500
      logger.error(exception.stack);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
