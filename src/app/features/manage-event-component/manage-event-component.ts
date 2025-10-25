import { Component, inject } from '@angular/core';
import { EventService } from '../../core/services/EventService/event-service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, combineLatest } from 'rxjs';
import { Meetup } from '../../shared/models/meetup-model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { User } from '../../shared/models/user-model';
import { Message } from '../../shared/models/message-model';
import { UserService } from '../../core/services/UserService/user-service';
import { ChatBox } from '../../shared/chat-box/chat-box';

@Component({
  selector: 'app-manage-event-component',
  imports: [AsyncPipe, DatePipe,ChatBox],
  templateUrl: './manage-event-component.html',
  styleUrl: './manage-event-component.css'
})
export class ManageEventComponent {
  eventService = inject(EventService)
  userService = inject(UserService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  eventId:number = Number(this.route.snapshot.paramMap.get('id'));

  currentEvent$:Observable<Meetup> = this.eventService.getEventById(this.eventId)
  currentUser$:Observable<User> = this.userService.getCurrentUser()
  eventUsers$:Observable<User[]> = this.eventService.getEventUsers(this.eventId)
  eventMessages$:Observable<Message[]> = this.eventService.getEventMessages(this.eventId)

  // Check if current user is the owner
  isOwner$:Observable<boolean> = combineLatest([
    this.currentEvent$,
    this.currentUser$
  ]).pipe(
    map(([event, user]) => event.ownerId === user.id)
  )

  // Owner management methods
  kickUser(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir exclure cet utilisateur de l\'événement ?')) {
      this.eventService.kickUserFromEvent(this.eventId, userId).subscribe({
        next: () => {
          // Refresh the users list
          this.eventUsers$ = this.eventService.getEventUsers(this.eventId)
        },
        error: (error) => {
          console.error('Erreur lors de l\'exclusion de l\'utilisateur:', error)
          alert('Erreur lors de l\'exclusion de l\'utilisateur')
        }
      })
    }
  }

  cancelEvent() {
    if (confirm('Êtes-vous sûr de vouloir annuler cet événement ? Cette action est irréversible.')) {
      this.eventService.deleteEvent(this.eventId).subscribe({
        next: () => {
          alert('Événement annulé avec succès')
          this.router.navigate(['/dashboard'])
        },
        error: (error) => {
          console.error('Erreur lors de l\'annulation de l\'événement:', error)
          alert('Erreur lors de l\'annulation de l\'événement')
        }
      })
    }
  }
}
