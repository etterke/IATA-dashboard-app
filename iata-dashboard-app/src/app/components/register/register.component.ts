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
import { Subject, takeUntil } from 'rxjs';

export const GREETING: string =
  'Welcome to International Air Transport Association E-commerce analytics, please sign up to continue';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  @HostBinding('class.app-login') hostClass = true;

  registerFrom: FormGroup;
  greeting: string = GREETING;
  isExistingUser: boolean = false;
  users: UserDetailsResponse[] = [];
  unsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.registerFrom = new FormGroup({
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
    const username: string = this.registerFrom.get('username')?.value;
    const password: string = this.registerFrom.get('password')?.value;
    this.userService
      .registerUser({ username, password })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        if (value) {
          this.router.navigate(['/login']);
        } else {
          alert('Registration was unsuccessful');
        }
      });
  }

  resetForm() {
    this.registerFrom.reset();
    this.registerFrom.get('username')?.reset();
    this.registerFrom.get('password')?.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
