import { Component, inject } from '@angular/core';
import { EventService } from '../../core/services/EventService/event-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Meetup } from '../../shared/models/meetup-model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-manage-event-component',
  imports: [AsyncPipe],
  templateUrl: './manage-event-component.html',
  styleUrl: './manage-event-component.css'
})
export class ManageEventComponent {
  eventService = inject(EventService)
  route = inject(ActivatedRoute)

  eventId:number = Number(this.route.snapshot.paramMap.get('id'));

  currentEvent$:Observable<Meetup> = this.eventService.getEventById(this.eventId)
}
