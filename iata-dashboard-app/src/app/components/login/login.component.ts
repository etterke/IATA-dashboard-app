import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

export const GREETING: string =
  'Welcome to International Air Transport Association E-commerce analytics, please log in to continue';

export interface LoginInfo {
  username: string;
  password: string;
}
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
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @HostBinding('class.app-login') hostClass = true;
  loginForm: any;
  greeting: string = GREETING;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.valid) {
      this.authService.isAuthenticatedUser().subscribe((response) => {
        console.log(response, 'login befutott');
        if (response) {
          this.router.navigate(['/dashboard']);
        } else {
          this.authService.registerUser({ username, password });
        }
      });
    }
  }
}
