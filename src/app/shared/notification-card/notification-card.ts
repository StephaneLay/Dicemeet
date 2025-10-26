import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Notification } from '../models/notification-model';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../core/services/NotificationService/notification-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification-card',
  imports: [DatePipe],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.css'
})
export class NotificationCard {
  @Input() notification!: Notification;
  notificationService = inject(NotificationService);
  router = inject(Router);
  @Output() deleteNotificationEvent = new EventEmitter<number>();
  deleteNotification(id: number) {
      this.deleteNotificationEvent.emit(id);
  }
}
