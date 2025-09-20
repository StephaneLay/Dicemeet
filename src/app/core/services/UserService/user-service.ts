import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../../shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUrl = 'http://localhost:8000/api/private';

  http = inject(HttpClient);

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }

  updateUser(data: Partial<User> | FormData) {
    if (data instanceof FormData) {
      // méthode override pour s'assurer que PHP parse bien les fichiers
      data.append('_method', 'PATCH');
      // envoyer en POST : PHP parse $_POST & $_FILES correctement
      return this.http.post<User>(`${this.apiUrl}/users/me`, data);
    } else {
      return this.http.patch<User>(
        `${this.apiUrl}/users/me`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
}