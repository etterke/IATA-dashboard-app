import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  delay,
  dematerialize,
  materialize,
  of,
  throwError
} from 'rxjs';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  // default employes json path
  private _usersJsonPath: string = 'assets/mock-api-responses/users.json';
  constructor(private http: HttpClient) {}
  intercept(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: HttpRequest<any>,
    next: HttpHandler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler) {
    const { url, method } = req;
    switch (true) {
      case url.endsWith('/login') && method === 'GET':
        return this.authenticate(req, next);
      default:
        // pass through any requests not handled above
        return next.handle(req);
    }
  }

  authenticate(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      url: this._usersJsonPath
    });
    return next.handle(req).pipe(delay(500));
  }

  //   function ok(body?: any) {
  //     return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
  //   }

  //   function error(message: string) {
  //     return throwError(() => ({ error: { message } })).pipe(
  //       materialize(),
  //       delay(500),
  //       dematerialize()
  //     ); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
  //   }

  //   function unauthorized() {
  //     return throwError(() => ({
  //       status: 401,
  //       error: { message: 'Unauthorized' }
  //     })).pipe(materialize(), delay(500), dematerialize());
  //   }

  //   function basicDetails(user: any) {
  //     const { id, username, firstName, lastName } = user;
  //     return { id, username, firstName, lastName };
  //   }
  // }

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
  //   const { url, method } = req;
  //   if (url.endsWith('/login') && method === 'GET') {
  //     req = req.clone({
  //       url: this._usersJsonPath
  //     });
  //     return next.handle(req).pipe(delay(500));
  //   }
  //   return next.handle(req);
  // }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true
};
