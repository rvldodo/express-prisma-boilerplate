// message, status code, error code, errors

export class HttpException extends Error {
  message: string;
  statusCode: any;
  errorCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    errors: any,
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  BAD_REQUEST = 1004,
  UNPROCESSABLE_ENTITY = 20001,
  INTERNAL_EXCEPTION = 3001,
}
