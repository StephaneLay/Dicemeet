import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../core/services/EventService/event-service';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { Filter } from '../../shared/models/filter-model';
import { Meetup } from '../../shared/models/meetup-model';
import { PlaceService } from '../../core/services/PlaceService/place-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-component',
  imports: [ReactiveFormsModule, SearchBar],
  templateUrl: './create-event-component.html',
  styleUrl: './create-event-component.css'
})
export class CreateEventComponent {
  eventService = inject(EventService);
  placeService = inject(PlaceService);
  router = inject(Router);
  eventForm = new FormGroup({
    game: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  })

  isedited = false;

  onSubmit() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }
    const event: Meetup = {
      game: this.eventForm.get('game')?.value ?? '',
      place: this.eventForm.get('place')?.value ?? '',
      city: this.eventForm.get('city')?.value ?? '',
      date: this.eventForm.get('date')?.value ?? '',
      maxParticipants : 0,
      participants : 0,
      ownerId : 0,
      id : 0,
    }
    this.eventService.createEvent(event).subscribe({
      next: (event) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err.error.message);
      }
    })
  }

  addfilter(filter: Filter) {
    if (filter.type === 'jeu') {
      this.isedited = true;
      this.eventForm.get('game')?.setValue(filter.name);
    } else if (filter.type === 'lieu') {
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
}
