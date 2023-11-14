import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

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
  providers: [AuthService, UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @HostBinding('class.app-login') hostClass = true;
  loginForm!: any;
  greeting: string = GREETING;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    const isAuthenticated = this.authService.isAuthenticatedUser();
    if (this.loginForm.valid) {
      console.log('login befutott');
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
      } else {
        this.userService.registerUser(this.loginForm.value);
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
