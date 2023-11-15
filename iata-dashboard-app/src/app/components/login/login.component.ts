import { Component, HostBinding, OnChanges, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit, OnChanges {
  @HostBinding('class.app-login') hostClass = true;
  loginForm: FormGroup;
  greeting: string = GREETING;
  isExistingUser: boolean = false;
  users: UserDetailsResponse[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // this.userService.getUsers().pipe(tap((result) => (this.users = result)));
    this.userService.getUsers().subscribe(
      (result) => {
        this.users = result;
      },
      (err) => console.log(err)
    );
  }

  ngOnChanges() {}

  onSubmit(): void {
    const username: string = this.loginForm.get('username')?.value;
    const password: string = this.loginForm.get('password')?.value;
    this.findExistingUser(username, password);
    if (this.isExistingUser) {
      this.router.navigate(['/dashboard']);
    } else {
      console.log('befutott');
      this.userService.registerUser({ username, password }).subscribe(() => {
        alert('Employee successfully regsitered');
      });
      this.router.navigate(['/login']);
    }
  }

  findExistingUser(username: string, password: string): void {
    this.isExistingUser = this.users.some((user) => {
      username === user.username && password === user.password;
    });
  }
}
