import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/UserService/user-service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user-model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Meetup } from '../../shared/models/meetup-model';
import { EventService } from '../../core/services/EventService/event-service';
import { MeetupCard } from '../../shared/meetup-card/meetup-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  imports: [AsyncPipe, MeetupCard, RouterLink,DatePipe],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent {

  userService = inject(UserService)
  eventService = inject(EventService)

  user$:Observable<User> = this.userService.getCurrentUser();
  userMeetups$!:Observable<Meetup[]>

  ngOnInit(){
  this.userService.getCurrentUser().subscribe({
      next: (currentUser) => {
        this.userMeetups$ = this.userService.getUserEvents(currentUser.id)
      }
    });

  }

}
