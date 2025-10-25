import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../../shared/models/filter-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8000/api/public/search';

  http = inject(HttpClient);

  public search(query: string, searchType?: 'games' | 'places' | 'city'): Observable<Filter[]> {
    if (searchType) {
      return this.http.get<Filter[]>(`${this.apiUrl}?search=${query}&type=${searchType}`);
    }
    // Recherche par défaut (événements) - comportement original
    return this.http.get<Filter[]>(`${this.apiUrl}?search=${query}`);
  }
}
