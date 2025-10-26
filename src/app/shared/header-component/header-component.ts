import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from "@angular/router";
import { AuthService } from '../../core/services/auth/auth-service';
import { AsyncPipe } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink,AsyncPipe],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  isAuthenticated$ = this.authService.isLoggedIn$();
  
  ngOnInit() {
    this.authService.checkAuthStatus();
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.authService.checkAuthStatus();
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
