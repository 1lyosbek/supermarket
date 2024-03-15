import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResData } from './resData';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const responseBody = new ResData(
      '',
      HttpStatus.INTERNAL_SERVER_ERROR,
      null,
      exception,
    );

    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();

      const response = exception.getResponse() as Error;

      if (typeof response === 'string') {
        responseBody.message = response;
      } else {
        responseBody.message = response?.message.toString();
      }
    } else {
      responseBody.message = exception.message;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
