import { Component, inject } from '@angular/core';
import { EventService } from '../../core/services/EventService/event-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { User } from '../../shared/models/user-model';
import { Message } from '../../shared/models/message-model';
import { UserService } from '../../core/services/UserService/user-service';
import { ChatBox } from '../../shared/chat-box/chat-box';
import { MessageService } from '../../core/services/MessageService/message-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { Filter } from '../../shared/models/filter-model';
import { PlaceService } from '../../core/services/PlaceService/place-service';
import { Meetup } from '../../shared/models/meetup-model';

@Component({
  selector: 'app-manage-event-component',
  imports: [AsyncPipe, DatePipe, ChatBox, ReactiveFormsModule, SearchBar],
  templateUrl: './manage-event-component.html',
  styleUrl: './manage-event-component.css'
})
export class ManageEventComponent implements OnInit {
  eventService = inject(EventService);
  userService = inject(UserService);
  messageService = inject(MessageService);
  placeService = inject(PlaceService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  eventId: number = Number(this.route.snapshot.paramMap.get('id'));

  // Form for editing event
  eventForm = new FormGroup({
    place: new FormControl(''),
    city: new FormControl(''),
    date: new FormControl(''),
  });

  // UI state
  editMode = false;
  hasFormChanges = false;

  // Observables - simple and straightforward
  currentEvent$!: Observable<Meetup | undefined>;
  currentUser$!: Observable<User>;
  eventUsers$!: Observable<User[]>;
  eventMessages$!: Observable<Message[]>;

  ngOnInit() {
    this.loadData();
  }

  // Load all data for the event
  loadData() {
    this.currentEvent$ = this.eventService.getEventById(this.eventId).pipe(
      catchError(err => {
        if (err.status === 404) {
          this.router.navigate(['/not-found']);
        }
        return of(undefined);
      })
    );

    this.currentUser$ = this.userService.getCurrentUser();
    this.eventUsers$ = this.eventService.getEventUsers(this.eventId);
    this.eventMessages$ = this.eventService.getEventMessages(this.eventId).pipe(
      catchError(() => of([]))
    );
  }

  // Check if current user is the owner
  isOwner(event: Meetup | undefined, user: User | undefined): boolean {
    if (!event || !user) return false;
    return event.ownerId === user.id;
  }

  // Check if current user is a participant
  isParticipant(users: User[] | undefined, user: User | undefined): boolean {
    if (!users || !user) return false;
    return users.some(u => u.id === user.id);
  }

  // Check if event is full
  isEventFull(event: Meetup | undefined): boolean {
    if (!event) return false;
    return event.participants >= event.maxParticipants;
  }

  // Determine what action user can take
  getUserAction(event: Meetup | undefined, users: User[] | undefined, user: User | undefined): 'loading' | 'canJoin' | 'isParticipant' | 'isFull' {
    if (!event || !user || !users) return 'loading';
    if (this.isParticipant(users, user)) return 'isParticipant';
    if (this.isEventFull(event)) return 'isFull';
    return 'canJoin';
  }


  // UI methods
  startEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.hasFormChanges = false;
    this.eventForm.reset();
  }

  // Event management methods
  updateEvent() {
    const updateData: { date?: string; place?: string; city?: string } = {};

    if (this.eventForm.get('date')?.value) {
      updateData.date = this.eventForm.get('date')?.value ?? '';
    }
    if (this.eventForm.get('place')?.value) {
      updateData.place = this.eventForm.get('place')?.value ?? '';
      updateData.city = this.eventForm.get('city')?.value ?? '';
    }

    if (Object.keys(updateData).length === 0) {
      alert('Veuillez remplir au moins un champ');
      return;
    }

    this.eventService.updateEvent(this.eventId, updateData).subscribe({
      next: () => {
        alert('Événement modifié avec succès');
        this.cancelEdit();
        this.loadData();
      },
      error: () => {
        alert('Erreur lors de la modification de l\'événement');
      }
    });
  }

  cancelEvent() {
    if (confirm('Êtes-vous sûr de vouloir annuler cet événement ? Cette action est irréversible.')) {
      this.eventService.deleteEvent(this.eventId).subscribe({
        next: () => {
          alert('Événement annulé avec succès');
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Erreur lors de l\'annulation de l\'événement');
        }
      });
    }
  }

  // Participant management
  joinEvent(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir rejoindre cet événement ?')) {
      this.eventService.joinEvent(this.eventId, userId).subscribe({
        next: () => {
          alert('Vous avez rejoint l\'événement avec succès');
          this.loadData();
        },
        error: () => {
          alert('Erreur lors de l\'inscription à l\'événement');
        }
      });
    }
  }

  leaveEvent(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir quitter cet événement ?')) {
      this.eventService.kickUserFromEvent(this.eventId, userId).subscribe({
        next: () => {
          alert('Vous avez quitté l\'événement avec succès');
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Erreur lors de la désinscription');
        }
      });
    }
  }

  kickUser(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir exclure cet utilisateur de l\'événement ?')) {
      this.eventService.kickUserFromEvent(this.eventId, userId).subscribe({
        next: () => {
          alert('Utilisateur exclu avec succès');
          this.loadData();
        },
        error: () => {
          alert('Erreur lors de l\'exclusion de l\'utilisateur');
        }
      });
    }
  }

  // Chat methods
  postMessage(content: string) {
    this.messageService.postChatMessage(this.eventId, content).subscribe({
      next: () => {
        this.eventMessages$ = this.eventService.getEventMessages(this.eventId).pipe(
          catchError(() => of([]))
        );
      }
    });
  }

  // Form handling
  onPlaceFilterSelected(filter: Filter) {
    if (filter.type === 'lieu') {
      this.hasFormChanges = true;
      this.eventForm.get('place')?.setValue(filter.name);
      this.placeService.getPlaceById(filter.id).subscribe({
        next: (place) => {
          this.eventForm.get('city')?.setValue(place.cityName);
        },
        error: () => {
          alert('Erreur lors de la récupération du lieu');
        }
      });
    }
  }
}


