import { Provider } from '@angular/core';
import { MockUserService } from './user.service.mock';
import { AuthService } from '../auth service/auth.service';

export class MockAuthService {
  getUsers = jasmine.createSpyObj('UserService', ['isAuthenticatedUser']);
  registerUser = jasmine.createSpyObj('UserService', ['login']);
}

export const provideMockAuthService = (): Provider => ({
  provide: AuthService,
  useClass: MockUserService
});
