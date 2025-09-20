import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth-service';

@Injectable({ providedIn: 'root' })
export class HomeGuard implements CanActivate {

  auth = inject(AuthService);
  router = inject(Router);

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return false; 
    }
    return true;
  }
}
