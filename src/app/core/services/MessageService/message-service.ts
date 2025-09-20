import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../../shared/models/user-model';
import { Message } from '../../../shared/models/message-model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    readonly apiUrl = 'http://localhost:8000/api/private';

    http = inject(HttpClient);
    
    getUserInterlocutors() {
        return this.http.get<User[]>(`${this.apiUrl}/messages`);
    }

    getChat(interlocutorId: number) {
        return this.http.get<Message[]>(`${this.apiUrl}/messages/${interlocutorId}`);
    }

  }