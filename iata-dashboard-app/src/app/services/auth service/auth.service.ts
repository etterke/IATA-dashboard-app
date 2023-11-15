import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from '../user-service/user.service';
import { UserDetailsResponse } from '../../models/auth.model';
import { findExistingUser } from '../../utils/findExistingUser.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticatedUser: Observable<boolean> = of(false);
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  login(
    users: UserDetailsResponse[],
    username: string,
    password: string
  ): Observable<boolean> {
    this.isAuthenticatedUser = of(findExistingUser(username, password, users));
    return this.isAuthenticatedUser;
  }
}
