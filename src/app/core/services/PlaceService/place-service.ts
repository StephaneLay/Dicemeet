import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Place } from '../../../shared/models/places-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
    readonly apiUrl = 'http://localhost:8000/api/private/places';

    http = inject(HttpClient);

    getPlaceById(id: number) : Observable<Place> {
        return this.http.get<Place>(`${this.apiUrl}/${id}`);
    }

    
}
