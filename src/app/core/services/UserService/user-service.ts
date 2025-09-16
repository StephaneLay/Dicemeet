import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../../shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly  apiUrl = 'http://localhost:8000/api/private';

  http = inject(HttpClient);

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }

  updateUser(data: Partial<User> | FormData) {
  if (data instanceof FormData) {
    // multipart/form-data pour l'image
    return this.http.patch<User>(
      `${this.apiUrl}/users/me`,
      data
    );
  } else {
    // JSON pour le reste
    return this.http.patch<User>(
      `${this.apiUrl}/users/me`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
}