import { Component, inject } from '@angular/core';
import { SearchBar } from "../../shared/search-bar/search-bar";
import { EventService } from '../../core/services/EventService/event-service';
import { MeetupCard } from "../../shared/meetup-card/meetup-card";

@Component({
  selector: 'app-games-list-component',
  imports: [SearchBar, MeetupCard],
  templateUrl: './games-list-component.html',
  styleUrl: './games-list-component.css'
})
export class GamesListComponent {
  
  filteredEvents: any[] = [];
  eventService = inject(EventService);

  ngOnInit() {
  this.eventService.getAll().subscribe(events => {
      console.log(events);
      this.filteredEvents = events;
    });

  }

onFiltersChanged(filters: any[]) {
  if (filters.length === 0) {
    console.log("No filters applied, fetching all events.");
    this.eventService.getAll().subscribe(events => {
      console.log(events);
      this.filteredEvents = events;
    });
  } else {
    this.eventService.getFilteredEvents(filters).subscribe(events => {
      console.log(events);
      this.filteredEvents = events;
    });
  }
}


deleteFilter(filter: any) {
  this.eventService.deleteEvent(filter.id).subscribe(() => {
    this.filteredEvents = this.filteredEvents.filter(e => e.id !== filter.id);
  });
}
}
