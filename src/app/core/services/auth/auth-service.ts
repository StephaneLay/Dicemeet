import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';

  http = inject(HttpClient);

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login_check`, credentials);
  }

  register(data: { email: string; name: string; password: string }) {
    return this.http.post<{ success?: boolean; error?: string }>(
      `${this.baseUrl}/public/register`,
      data
    );
  }

  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
