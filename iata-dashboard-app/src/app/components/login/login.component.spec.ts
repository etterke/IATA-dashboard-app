import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user-service/user.service';
import {
  MockRouter,
  provideMockRouter
} from '../../services/mocks/router.mock';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  UserDetailPayload,
  UserDetailsResponse
} from '../../models/auth.model';
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
  let router: MockRouter;
  let httpTestingController: HttpTestingController;

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
          useClass: { getUsers: jasmine.isSpy, registerUser: jasmine.isSpy }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    router = TestBed.inject<any>(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    spyOn(userService, 'getUsers').and.returnValue(of(users));
    component.ngOnInit();

    expect(component.users).toEqual(users);
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      spyOn(userService, 'registerUser');
      spyOn(router, 'navigate');
    });
    it('should call findExistingUser', () => {
      component.loginForm = new FormGroup({
        username: new FormControl('esnagy', Validators.required),
        password: new FormControl('kiskutya', Validators.required)
      });
      spyOn(component, 'findExistingUser');

      component.onSubmit();
      expect(component.findExistingUser).toHaveBeenCalledWith(
        'esnagy',
        'kiskutya'
      );
    });

    it('should call router navigation to dashboard when there is existing user logging in', () => {
      spyOn(component, 'findExistingUser');
      component.isExistingUser = true;

      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should register user and navigate to login when there is no existing user', () => {
      component.loginForm = new FormGroup({
        username: new FormControl('esnagy', Validators.required),
        password: new FormControl('kiskutya', Validators.required)
      });
      spyOn(component, 'findExistingUser');
      component.isExistingUser = false;

      component.onSubmit();
      expect(userService.registerUser).toHaveBeenCalledWith({
        username: 'esnagy',
        password: 'kiskutya'
      } as UserDetailPayload);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('findExistingUser', () => {
    it('should set isExistingUser', () => {
      component.users = users;
      component.findExistingUser('esnagy', 'kiskutya');

      expect(component.isExistingUser).toEqual(true);
    });
  });
});
