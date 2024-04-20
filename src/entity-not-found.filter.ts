import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const entityName = this.extractEntityName(exception.message);

    response
      .status(HttpStatus.NOT_FOUND)
      .json({
        statusCode: HttpStatus.NOT_FOUND,
        message: `The requested ${entityName || 'item'} was not found`,
        error: 'Not Found'
      });
  }

  private extractEntityName(errorMessage: string): string | null {
    const match = errorMessage.match(/entity of type "(.*?)" matching/);
    return match ? match[1] : null;
  }
}
