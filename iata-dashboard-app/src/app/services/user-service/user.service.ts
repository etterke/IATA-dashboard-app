import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UserDetailPayload,
  UserDetailsResponse
} from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDetailsResponse[]> {
    return this.http.get<UserDetailsResponse[]>('http://localhost:3000/users');
  }

  registerUser(payload: UserDetailPayload): Observable<any> {
    return this.http.post<UserDetailsResponse>(
      'http://localhost:3000/users',
      payload
    );
  }
}
