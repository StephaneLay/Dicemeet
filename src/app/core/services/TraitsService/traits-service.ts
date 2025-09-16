import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Trait } from '../../../shared/models/traits-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraitsService {
    readonly baseUrl = 'http://localhost:8000/api/private/traits';

    http = inject(HttpClient);

    getAllTraits() : Observable<Trait[]> {
        return this.http.get<Trait[]>(this.baseUrl);
    }

}
