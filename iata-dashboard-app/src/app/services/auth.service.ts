import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsResponse, UserDetailPayload } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticatedUser(): Observable<UserDetailsResponse[]> {
    return this.http.get<UserDetailsResponse[]>('http://localhost:3000/users');
  }

  registerUser(payload: UserDetailPayload): Observable<UserDetailsResponse> {
    return this.http.post<UserDetailsResponse>(
      'http://localhost:3000/users',
      payload
    );
  }
}
