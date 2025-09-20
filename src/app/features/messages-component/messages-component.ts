import { Component, inject } from '@angular/core';
import { MessageService } from '../../core/services/MessageService/message-service';

@Component({
  selector: 'app-messages-component',
  imports: [],
  templateUrl: './messages-component.html',
  styleUrl: './messages-component.css'
})
export class MessagesComponent {

  messageService = inject(MessageService);

  userMessages$ = this.messageService.getUserMessages();

  ngOnInit(): void {

  }
}
