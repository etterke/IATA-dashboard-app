/* eslint-disable no-debugger */
import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service/user.service';
import { UserDetailsResponse } from '../../models/auth.model';
import { AuthService } from '../../services/auth service/auth.service';
import { Subject, takeUntil } from 'rxjs';

export const GREETING: string =
  'Welcome to International Air Transport Association E-commerce analytics, please log in to continue';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @HostBinding('class.app-login') hostClass = true;

  loginForm: FormGroup;
  greeting: string = GREETING;
  isExistingUser: boolean = false;
  users: UserDetailsResponse[] = [];
  unsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (result) => {
        this.users = result;
      },
      (err) => console.log(err)
    );
  }

  onSubmit(): void {
    const username: string = this.loginForm.get('username')?.value;
    const password: string = this.loginForm.get('password')?.value;
    this.authService
      .login(this.users, username, password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        if (value) {
          this.router.navigate(['/dashboard']);
        } else {
          this.userService.registerUser({ username, password });
          this.resetForm();
          this.router.navigate(['/dashboard']);
        }
      });
  }

  resetForm() {
    this.loginForm.reset();
    this.loginForm.get('username')?.reset();
    this.loginForm.get('password')?.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
