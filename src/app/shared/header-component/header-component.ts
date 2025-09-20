import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth/auth-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink,AsyncPipe],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isAuthenticated$ = this.authService.isLoggedIn$();
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
