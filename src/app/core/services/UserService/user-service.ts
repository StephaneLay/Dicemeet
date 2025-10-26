import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../../shared/models/user-model';
import { Meetup } from '../../../shared/models/meetup-model';
import { Notification } from '../../../shared/models/notification-model';
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

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/users/${userId}/notifications`);
  }

  getUserEvents(userId: number): Observable<Meetup[]> {
    return this.http.get<Meetup[]>(`${this.apiUrl}/users/${userId}/events`);
  }

  getUserOwnedEvents(userId: number): Observable<Meetup[]> {
    return this.http.get<Meetup[]>(`${this.apiUrl}/users/${userId}/owned`);
  }
}