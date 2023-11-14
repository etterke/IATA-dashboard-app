// import {
//   HTTP_INTERCEPTORS,
//   HttpClient,
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpResponse
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, delay, of } from 'rxjs';

// @Injectable()
// export class FakeBackendHttpInterceptor implements HttpInterceptor {
//   // default employes json path
//   private _usersJsonPath: string = 'assets/mock-api-responses/users.json';
//   private _productsJsonPath: string =
//     'assets/mock-api-responses/inventory.json';
//   constructor(private http: HttpClient) {}
//   intercept(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     req: HttpRequest<any>,
//     next: HttpHandler
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   ): Observable<HttpEvent<any>> {
//     return this.handleRequests(req, next);
//   }

//   handleRequests(req: HttpRequest<any>, next: HttpHandler) {
//     const { url, method } = req;
//     switch (true) {
//       case url.endsWith('/login') && method === 'GET':
//         return this.authenticate(req, next);
//       case url.endsWith('/login') && method === 'POST':
//         return this.registerUser(req);
//       case url.endsWith('/addInventory') && method === 'GET':
//         return this.getProducts(req, next);
//       default:
//         // pass through any requests not handled above
//         return next.handle(req);
//     }
//   }

//   authenticate(req: HttpRequest<any>, next: HttpHandler) {
//     req = req.clone({
//       url: this._usersJsonPath
//     });
//     return next.handle(req).pipe(delay(500));
//   }

//   registerUser(req: HttpRequest<any>) {
//     const { body } = req.clone();
//     body.id = uuid();
//     return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
//   }

//   getProducts(req: HttpRequest<any>, next: HttpHandler) {
//     req = req.clone({
//       url: this._productsJsonPath
//     });
//     return next.handle(req).pipe(delay(500));
//   }
// }

// export const fakeBackendProvider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: FakeBackendHttpInterceptor,
//   multi: true
// };
