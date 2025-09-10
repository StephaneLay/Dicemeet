import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  authService = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.email && this.loginForm.value.password) {
        this.authService.login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }).subscribe({
          next: (response) => {
            this.authService.saveToken(response.token);
          }
        });
      }
      this.router.navigate(['/']);
    }
   }
}
