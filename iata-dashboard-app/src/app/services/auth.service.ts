import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = true;
  constructor(private http: HttpClient) {}

  isAuthenticatedUser(): Observable<boolean> {
    return of(this.isAuthenticated);
    // return this.http.get<UserDetailsResponse[]>('http://localhost:3000/users');
  }
}
