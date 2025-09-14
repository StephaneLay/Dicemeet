import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe-component',
  imports: [ReactiveFormsModule],
  templateUrl: './subscribe-component.html',
  styleUrl: './subscribe-component.css'
})
export class SubscribeComponent {

  authService = inject(AuthService);
  router = inject(Router);

  subscribeform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator });

  
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
  if (this.subscribeform.invalid) return;

  const { email, name, password } = this.subscribeform.value;

  this.authService.register({ 
    email: email!, 
    name: name!, 
    password: password! 
  }).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (err) => {
      if (err.error.error === 'Email déjà utilisé') {
        this.subscribeform.get('email')?.setErrors({ emailTaken: true });
      }
      if (err.error.error === 'Nom déjà utilisé') {
        this.subscribeform.get('name')?.setErrors({ nameTaken: true });
      }
    }
  });
}
}
