
import { Injectable, ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const control = host.switchToHttp();
    const response = control.getResponse();
    const request = control.getRequest();

    console.log(exception);

    const { status: code, message: { error: name, message }} = exception;

    const payload =  {
      name: name || undefined,
      code: code || null,
      message: message || 'Internal Server Error',
    };
    response
      .status(code)
      .json({error: payload });
  }
}
