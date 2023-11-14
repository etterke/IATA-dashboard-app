import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { UserDetailsResponse } from '../../models/auth.model';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  const testUrl: string = 'http://localhost:3000/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return users', () => {
    const users: UserDetailsResponse[] = [];
    userService.getUsers().subscribe((users) => {
      expect(users).toEqual(users);
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(users);
  });

  it('should register users', () => {
    const users: UserDetailsResponse[] = [];
    const user: UserDetailsResponse = {
      id: 1,
      username: 'esnagy',
      password: 'kiskutya'
    };
    userService.registerUser(user).subscribe(() => {
      expect(users).toEqual([...users, user]);
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(users);
  });
});
