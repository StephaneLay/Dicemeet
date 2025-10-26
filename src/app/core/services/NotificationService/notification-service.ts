import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly apiUrl = 'http://localhost:8000/api/private/notifications';
  http = inject(HttpClient);

  deleteNotification(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
