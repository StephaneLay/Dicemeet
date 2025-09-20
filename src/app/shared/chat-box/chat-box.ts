import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../models/message-model';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  imports: [AsyncPipe,DatePipe,ReactiveFormsModule,FormsModule],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.css'
})
export class ChatBox {
  @Input() messages$: Observable<Message[]> | null = null;
  @Input() currentUserId!: number;
  @Output() sendMessageEvent = new EventEmitter<string>();

  newMessage: string = '';

  send() {
    if (this.newMessage.trim()) {
      this.sendMessageEvent.emit(this.newMessage.trim());
      this.newMessage = '';
    }
  }
}

