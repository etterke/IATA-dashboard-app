import { Provider } from '@angular/core';
import { Router } from '@angular/router';

export class MockRouter implements Partial<Router> {
  navigate = jasmine.createSpy();
}

export const provideMockRouter = (): Provider => ({
  provide: Router,
  useClass: MockRouter
});
