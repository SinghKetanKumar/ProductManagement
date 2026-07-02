import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [

    CommonModule,

    ReactiveFormsModule,

    MatCardModule,

    MatFormFieldModule,

    MatInputModule,

    MatButtonModule,

    MatIconModule

  ],

  templateUrl: './login.html',

  styleUrl: './login.css'

})

export class Login {

  hide = true;

  loginForm;

  constructor(

    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router

  ) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required]

    });

  }

  login() {

    if (this.loginForm.invalid) {

      return;

    }

    this.authService.login(this.loginForm.value).subscribe({

      next: (response: any) => {

        localStorage.setItem("token", response.token);

        this.router.navigate(['/dashboard']);

      },

      error: (err) => {

        alert(err.error.message);

      }

    });

  }

}