import { Provider } from '@angular/core';
import { UserService } from '../user-service/user.service';

export class MockUserService {
  getUsers = jasmine.createSpyObj('UserService', ['getUsers']);
  registerUser = jasmine.createSpyObj('UserService', ['registerUser']);
}

export const provideMockUserService = (): Provider => ({
  provide: UserService,
  useClass: MockUserService
});
