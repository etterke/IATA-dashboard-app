import { TestBed, fakeAsync } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree
} from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth service/auth.service';
import { Observable, of, throwError } from 'rxjs';

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  const urlPath = '/dataset';
  const expectedUrl = 'login';
  const expectedQueryParams = { loggedOut: true, origUrl: urlPath };

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(authGuard, ['isAuthenticatedUser']);
    mockRouter = jasmine.createSpyObj(authGuard, ['navigate']);
    mockRouter.parseUrl.and.callFake((url: string) => {
      const urlTree = new UrlTree();
      const urlSegment = new UrlSegment(url, {});
      urlTree.root = new UrlSegmentGroup([urlSegment], {});
      return urlTree;
    });
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    });
  });

  it('should return false if the user is not logged in ', fakeAsync(async () => {
    mockIsLoggedInFalse();
    const authenticated = await runAuthGuardWithContext(
      getAuthGuardWithDummyUrl(urlPath)
    );
    expect(authenticated).toBeFalsy();
  }));

  it('should return true if the user is logged in ', fakeAsync(async () => {
    mockIsLoggedInTrue();
    const authenticated = await runAuthGuardWithContext(
      getAuthGuardWithDummyUrl(urlPath)
    );
    expect(authenticated).toBeTruthy();
  }));

  it('should redirect to login with originalUrl and loggedOut url parameters if the user is not logged in ', fakeAsync(async () => {
    mockIsLoggedInFalse();
    const authenticated = await runAuthGuardWithContext(
      getAuthGuardWithDummyUrl(urlPath)
    );
    expect(mockRouter.createUrlTree).toHaveBeenCalledOnceWith(
      [mockRouter.parseUrl(expectedUrl)],
      { queryParams: expectedQueryParams }
    );
    expect(authenticated).toBeFalsy();
  }));

  it('should redirect to login with originalUrl and loggedOut url parameters if catches an error ', fakeAsync(async () => {
    mockAuthService.isAuthenticatedUser.and.returnValue(
      throwError(() => 'Authentication error')
    );
    const authenticated = await runAuthGuardWithContext(
      getAuthGuardWithDummyUrl(urlPath)
    );
    expect(mockRouter.navigate).toHaveBeenCalledOnceWith([expectedUrl], {
      queryParams: expectedQueryParams
    });
    expect(authenticated).toBeFalsy();
  }));

  function getAuthGuardWithDummyUrl(
    urlPath: string
  ): () =>
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    const dummyRoute = new ActivatedRouteSnapshot();
    dummyRoute.url = [new UrlSegment(urlPath, {})];
    const dummyState: RouterStateSnapshot = {
      url: urlPath,
      root: new ActivatedRouteSnapshot()
    };
    return () => authGuard(dummyRoute, dummyState);
  }

  async function runAuthGuardWithContext(
    authGuard: () =>
      | boolean
      | UrlTree
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree>
  ): Promise<boolean | UrlTree> {
    const result = TestBed.runInInjectionContext(authGuard);
    const authenticated =
      result instanceof Observable
        ? await handleObservableResult(result)
        : result;
    return authenticated;
  }

  function handleObservableResult(
    result: Observable<boolean | UrlTree>
  ): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve) => {
      result.subscribe((value) => {
        resolve(value);
      });
    });
  }

  const mockIsLoggedInTrue = () => {
    mockAuthService.isAuthenticatedUser.and.returnValue(of(true));
  };

  const mockIsLoggedInFalse = () => {
    mockAuthService.isAuthenticatedUser.and.returnValue(of(false));
  };
});

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
