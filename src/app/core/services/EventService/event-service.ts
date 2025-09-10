import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  api_url = 'http://localhost:8000/api/public/events';
  http = inject(HttpClient);

  getAll() : Observable<any[]> {
    return this.http.get<any[]>(this.api_url);
  }

  getFilteredEvents(filters: any[]): Observable<any[]> {
    const params = filters.map(f => `${f.type}:${f.id}`).join(',');
    return this.http.get<any[]>(`${this.api_url}/search?filters=${params}`);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api_url}/${id}`);
  }
}
