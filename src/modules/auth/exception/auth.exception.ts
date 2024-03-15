import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginOrPasswordWrongException extends HttpException {
  constructor() {
    super('User Login or Password Wrong!', HttpStatus.BAD_REQUEST);
  }
}
