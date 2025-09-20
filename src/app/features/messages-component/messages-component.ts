import { Component, inject } from '@angular/core';
import { MessageService } from '../../core/services/MessageService/message-service';
import { AsyncPipe } from '@angular/common';
import { User } from '../../shared/models/user-model';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ChatBox } from '../../shared/chat-box/chat-box';
import { Message } from '../../shared/models/message-model';
import { UserService } from '../../core/services/UserService/user-service';


@Component({
  selector: 'app-messages-component',
  standalone: true,
  imports: [AsyncPipe,ChatBox],
  templateUrl: './messages-component.html',
  styleUrl: './messages-component.css'
})
export class MessagesComponent {

  messageService = inject(MessageService);
  userservice = inject(UserService);

  interlocutors$: Observable<User[]> = this.messageService.getUserInterlocutors();
  messages$: Observable<Message[]> | null = null;
  currentUserId!:number;
  

  async ngOnInit(): Promise<void> {
    const users = await firstValueFrom(this.interlocutors$);
    if (users.length > 0) {
      this.displayChat(users[0].id);
    }
    this.currentUserId = (await firstValueFrom(this.userservice.getCurrentUser())).id;
  }

  displayChat(interlocutorId: number) {
    this.messageService.getChat(interlocutorId).subscribe({
      next: (messages) => {
        this.messages$ = of(messages);
      }
    });
  }

  sendMessage(content: string) {
    console.log("Sending message:", content);
    // Ici, vous pouvez appeler une méthode du service pour envoyer le message au backend
    // Par exemple : this.messageService.sendMessage(interlocutorId, content);
  }


}
