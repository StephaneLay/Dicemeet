import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from '../../../shared/models/meetup-model';
import { Filter } from '../../../shared/models/filter-model';
import { User } from '../../../shared/models/user-model';
import { Message } from '../../../shared/models/message-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  api_url = 'http://localhost:8000/api';
  http = inject(HttpClient);

  getAll() : Observable<Meetup[]> {
    return this.http.get<Meetup[]>(`${this.api_url}/public/events`);
  }

  getEventById(id: number) : Observable<Meetup>{
    return this.http.get<Meetup>(`${this.api_url}/private/events/${id}`)
  }

  getEventUsers(eventId: number) : Observable<User[]> {
    return this.http.get<User[]>(`${this.api_url}/private/events/${eventId}/users`);
  }

  getEventMessages(eventId: number) : Observable<Message[]> {
    return this.http.get<Message[]>(`${this.api_url}/private/events/${eventId}/messages`);
  }

  getFilteredEvents(filters: Filter[]): Observable<Meetup[]> {
    const params = filters.map(f => `${f.type}:${f.name}`).join(',');
    return this.http.get<any[]>(`${this.api_url}/private/events/search?filters=${params}`);
  }

  createEvent(event: Meetup): Observable<Meetup> {
    return this.http.post<Meetup>(`${this.api_url}/private/events`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api_url}/private/events/${id}`);
  }

  updateEvent(id: number, data: { date?: string; place?: string; city?: string }): Observable<Meetup> {
    return this.http.patch<Meetup>(`${this.api_url}/private/events/${id}`, data);
  }

  kickUserFromEvent(eventId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.api_url}/private/events/${eventId}/users/${userId}`);
  }
}
