import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../../shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/private';

  http = inject(HttpClient);

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getCurrentUserId(): Observable<number> {
  return this.http.get<{ id: number }>(`${this.apiUrl}/current-user-id`).pipe(
    map(response => response.id)
  );
}
}