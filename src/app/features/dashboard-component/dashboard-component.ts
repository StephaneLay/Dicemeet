import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/UserService/user-service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user-model';
import { AsyncPipe } from '@angular/common';
import { Meetup } from '../../shared/models/meetup-model';
import { EventService } from '../../core/services/EventService/event-service';
import { MeetupCard } from '../../shared/meetup-card/meetup-card';
import { Router, RouterLink } from '@angular/router';
import { Notification } from '../../shared/models/notification-model';
import { NotificationCard } from '../../shared/notification-card/notification-card';
import { NotificationService } from '../../core/services/NotificationService/notification-service';
@Component({
  selector: 'app-dashboard-component',
  imports: [AsyncPipe, MeetupCard, RouterLink, NotificationCard],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent {

  userService = inject(UserService)
  eventService = inject(EventService)
  notificationService = inject(NotificationService)
  router = inject(Router)
  currentUserId!:number;
  user$:Observable<User> = this.userService.getCurrentUser();
  userMeetups$!:Observable<Meetup[]>
  userOwnedMeetups$!:Observable<Meetup[]>
  userNotifications$!:Observable<Notification[]>

  ngOnInit(){
  this.userService.getCurrentUser().subscribe({
      next: (currentUser) => {
        this.userMeetups$ = this.userService.getUserEvents(currentUser.id)
        this.userNotifications$ = this.userService.getUserNotifications(currentUser.id)
        this.userOwnedMeetups$ = this.userService.getUserOwnedEvents(currentUser.id)
        this.currentUserId = currentUser.id
      }
    });
  }

  deleteNotification(id: number) {
    this.notificationService.deleteNotification(id).subscribe({
      next: () => {
        this.userNotifications$ = this.userService.getUserNotifications(Number(this.currentUserId))
      }
    })
  }

}
