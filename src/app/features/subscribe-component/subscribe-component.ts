import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe-component',
  imports: [ReactiveFormsModule],
  templateUrl: './subscribe-component.html',
  styleUrl: './subscribe-component.css'
})
export class SubscribeComponent {
  subscribeform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  },
  )

  onSubmit(){
    if (this.subscribeform.invalid) {
      return console.log('invalide');
    }
    if (this.subscribeform.get('password')?.value !== this.subscribeform.get('confirmPassword')?.value) {
        return console.log('les mots de passe ne correspondent pas');
    }
    return console.log(this.subscribeform.value);
  }
}
