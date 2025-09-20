import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../../../shared/models/games-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    readonly apiUrl = 'http://localhost:8000/api/private/games';

    http = inject(HttpClient);

    getGameById(id: number) : Observable<Game> {
        return this.http.get<Game>(`${this.apiUrl}/${id}`);
    }
}
