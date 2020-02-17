
import { Injectable, ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from './response.interceptor';

const handleValidationError = (error: any) => {
  const response = error.map(err => {
    const { property, constraints } = err;
    return { property, constraints };
  });
  return response;
};

@Injectable()
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const control = host.switchToHttp();
    const response = control.getResponse();
    const request = control.getRequest();

    const { status: code } = exception;
    let {message: { error: name, message }} = exception;
    let data: Response<any>;

    if (typeof message !== 'string') {
      const validtionError = message;
      message = 'Invalid Request';
      data = handleValidationError(validtionError);
    }

    const payload =  {
      ...(name && { name }),
      ...(code && { code }),
      ...((message)  && { message } ),
      ...(data && { type: 'VALIDATION'}),
      ...(data && { data }),
    };
    response
      .status(code)
      .json({error: payload });
  }
}
