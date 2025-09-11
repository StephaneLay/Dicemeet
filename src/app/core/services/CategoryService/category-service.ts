import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:8000/api/public/categories';

    http = inject(HttpClient);

    getAllCategories() {
        return this.http.get<any[]>(this.apiUrl);
    }
}
