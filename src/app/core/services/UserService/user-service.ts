import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
