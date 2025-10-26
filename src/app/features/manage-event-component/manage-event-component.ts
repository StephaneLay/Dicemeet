import { Component, inject } from '@angular/core';
import { EventService } from '../../core/services/EventService/event-service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, combineLatest, of, catchError } from 'rxjs';
import { Meetup } from '../../shared/models/meetup-model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { User } from '../../shared/models/user-model';
import { Message } from '../../shared/models/message-model';
import { UserService } from '../../core/services/UserService/user-service';
import { ChatBox } from '../../shared/chat-box/chat-box';
import { MessageService } from '../../core/services/MessageService/message-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { Filter } from '../../shared/models/filter-model';
import { PlaceService } from '../../core/services/PlaceService/place-service';

@Component({
  selector: 'app-manage-event-component',
  imports: [AsyncPipe, DatePipe, ChatBox, ReactiveFormsModule, SearchBar],
  templateUrl: './manage-event-component.html',
  styleUrl: './manage-event-component.css'
})
export class ManageEventComponent {
  eventService = inject(EventService)
  userService = inject(UserService)
  messageService = inject(MessageService)
  placeService = inject(PlaceService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  eventId: number = Number(this.route.snapshot.paramMap.get('id'));

  eventForm = new FormGroup({
    place: new FormControl(''),
    city: new FormControl(''),
    date: new FormControl(''),
  })

  isedited = false;
  editMode = false;
  onEdit() {
    this.editMode = true;
  }

  currentEvent$ = this.eventService.getEventById(this.eventId).pipe(
    catchError(err => {
      if (err.status === 404) {
        this.router.navigate(['/not-found']);
      }
      return of(undefined);
    })
  )


  currentUser$: Observable<User> = this.userService.getCurrentUser()
  eventUsers$: Observable<User[]> = this.eventService.getEventUsers(this.eventId)
  eventMessages$!: Observable<Message[]>

  // Check if current user is the owner
  isOwner$: Observable<boolean> = combineLatest([
    this.currentEvent$,
    this.currentUser$
  ]).pipe(
    map(([event, user]) => event?.ownerId === user.id)
  )

  isParticipant$: Observable<boolean> = combineLatest([
    this.eventUsers$,
    this.currentUser$
  ]).pipe(
    map(([users, user]) => users.some(u => u.id === user.id))
  )

  canJoin$: Observable<boolean> = combineLatest([
    this.isParticipant$,
    this.currentEvent$,
    this.eventUsers$
  ]).pipe(
    map(([isParticipant, event, users]) => {
      return !isParticipant && !!event && (event.participants < event.maxParticipants);
    })
  )

  async ngOnInit() {
    await this.displayChat()
  }

  displayChat() {
    this.eventService.getEventMessages(this.eventId).subscribe({
      next: (messages) => {
        this.eventMessages$ = of(messages)
        console.log(messages);
      }
    })
  }


  // Owner management methods
  kickUser(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir exclure cet utilisateur de l\'événement ?')) {
      this.eventService.kickUserFromEvent(this.eventId, userId).subscribe({
        next: () => {
          alert('Utilisateur exclu avec succès')
          location.reload();
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

  postMessage(content: string) {
    this.messageService.postChatMessage(this.eventId, content).subscribe({
      next: () => {
        this.displayChat()
      }
    })
  }

  onUpdate() {
    const updateData: { date?: string; place?: string; city?: string } = {};

    if (this.eventForm.get('date')?.value) {
      updateData.date = this.eventForm.get('date')?.value ?? '';
    }
    if (this.eventForm.get('place')?.value) {
      updateData.place = this.eventForm.get('place')?.value ?? '';
      updateData.city = this.eventForm.get('city')?.value ?? '';
    }

    // Check if at least one field has been modified
    if (Object.keys(updateData).length === 0) {
      alert('Veuillez remplir au moins un champ');
      return;
    }

    this.eventService.updateEvent(this.eventId, updateData).subscribe({
      next: (event) => {
        console.log('Event updated:', event);
        alert('Événement modifié avec succès');
        this.eventForm.reset();
        this.isedited = false;
        this.editMode = false;
        // Refresh the event data
        this.currentEvent$ = this.eventService.getEventById(this.eventId);
      },
      error: (err) => {
        console.error(err.error.message);
        alert('Erreur lors de la modification de l\'événement');
      }
    });
  }

  addfilter(filter: Filter) {
    if (filter.type === 'lieu') {
      this.isedited = true;
      this.eventForm.get('place')?.setValue(filter.name);
      this.placeService.getPlaceById(filter.id).subscribe({
        next: (place) => {
          this.eventForm.get('city')?.setValue(place.cityName);
        },
        error: (err) => {
          console.error(err.error.message);
        }
      })
    }
  }

  clearEdited() {
    this.isedited = false;
    this.eventForm.reset();
  }

 

  leaveEvent() {
    if (confirm('Êtes-vous sûr de vouloir quitter cet événement ?')) {
      this.currentUser$.subscribe({
        next: (user) => {
          this.eventService.kickUserFromEvent(this.eventId, user.id).subscribe({
            next: () => {
              alert('Vous avez quitté l\'événement avec succès');
              this.router.navigate(['/dashboard']);
            },
            error: (error) => {
              alert('Erreur lors de la désinscription');
            }
          })
        }
      })
    }
  }

  joinEvent() {
    if (confirm('Êtes-vous sûr de vouloir rejoindre cet événement ?')) {
      this.currentUser$.subscribe({
        next: (user) => {
          this.eventService.joinEvent(this.eventId, user.id).subscribe({
            next: () => {
              alert('Vous avez rejoint l\'événement avec succès');
              location.reload();
            },
            error: (error) => {
              alert('Erreur lors de l\'inscription à l\'événement');
            }
          })
        }
      })
    }
  }
}


