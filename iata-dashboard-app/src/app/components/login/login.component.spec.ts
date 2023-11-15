import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user-service/user.service';
import {
  MockRouter,
  provideMockRouter
} from '../../services/mocks/router.mock';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  UserDetailPayload,
  UserDetailsResponse
} from '../../models/auth.model';
import { provideMockUserService } from '../../services/mocks/user.service.mock';
import { provideMockAuthService } from '../../services/mocks/auth.server.mock';
import { AuthService } from '../../services/auth service/auth.service';
import { of } from 'rxjs';

const users: UserDetailsResponse[] = [
  {
    id: 1,
    username: 'esnagy',
    password: 'kiskutya'
  },
  {
    id: 2,
    username: 'miturbek',
    password: 'lakers'
  },
  {
    id: 3,
    username: 'juturbek',
    password: 'malfi'
  }
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let authService: AuthService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockRouter,
        {
          provide: UserService,
          provideMockUserService,
          provideMockAuthService
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UserService);
        authService = TestBed.inject(AuthService);
        router = TestBed.inject<any>(Router);
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    spyOn(component, 'getUsers');
    component.ngOnInit();

    expect(component.getUsers).toHaveBeenCalledWith();
    expect(component.users).toEqual(users);
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      spyOn(userService, 'registerUser');
      spyOn(router, 'navigate');
      spyOn(component, 'resetForm');
    });
    it('should call authService', () => {
      component.loginForm = new FormGroup({
        username: new FormControl('esnagy', Validators.required),
        password: new FormControl('kiskutya', Validators.required)
      });
      component.users = users;
      spyOn(authService, 'login').and.returnValue(of(true));

      component.onSubmit();
      expect(authService.login).toHaveBeenCalledWith(
        users,
        'esnagy',
        'kiskutya'
      );
    });

    it('should call resetForm', () => {
      component.onSubmit();

      expect(component.resetForm).toHaveBeenCalledWith();
    });

    it('should call router navigation to dashboard when there is existing user logging in', () => {
      component.isExistingUser = true;

      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should register user and navigate to login when there is no existing user', () => {
      component.loginForm = new FormGroup({
        username: new FormControl('esnagy', Validators.required),
        password: new FormControl('kiskutya', Validators.required)
      });
      component.isExistingUser = false;

      component.onSubmit();
      expect(userService.registerUser).toHaveBeenCalledWith({
        username: 'esnagy',
        password: 'kiskutya'
      } as UserDetailPayload);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('resetForm', () => {
    component.loginForm = new FormGroup({
      username: new FormControl('esnagy', Validators.required),
      password: new FormControl('kiskutya', Validators.required)
    });

    component.resetForm();
  });
});
