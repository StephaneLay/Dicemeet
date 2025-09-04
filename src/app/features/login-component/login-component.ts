import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-component',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)
    
  })

  onSubmit(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }else{
      console.log('invalide');
    }
    
  }
}
