import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from '../../../shared/models/meetup-model';
import { Filter } from '../../../shared/models/filter-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  api_url = 'http://localhost:8000/api/public/events';
  http = inject(HttpClient);

  getAll() : Observable<Meetup[]> {
    return this.http.get<Meetup[]>(this.api_url);
  }

  getEventById(id: number) : Observable<Meetup>{
    return this.http.get<Meetup>(`${this.api_url}/${id}`)
  }

  getUserEvents(user_id:number) : Observable<Meetup[]> {
    return this.http.get<Meetup[]>(`${this.api_url}/users/${user_id}`);
  }

  getFilteredEvents(filters: Filter[]): Observable<Meetup[]> {
    const params = filters.map(f => `${f.type}:${f.name}`).join(',');
    console.log(params);
    return this.http.get<any[]>(`${this.api_url}/search?filters=${params}`);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api_url}/${id}`);
  }
}
