import { Component, inject } from '@angular/core';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { EventService } from '../../core/services/EventService/event-service';
import { MeetupCard } from '../../shared/meetup-card/meetup-card';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-games-list-component',
  imports: [SearchBar, MeetupCard],
  templateUrl: './games-list-component.html',
  styleUrl: './games-list-component.css'
})
export class GamesListComponent {
  eventService = inject(EventService);

  allEvents: any[] = [];
  filteredEvents: any[] = [];
  searchBarFilters: any[] = [];

  currentPage = 1;
  pageSize = 10;
  totalEvents = 0;

  ngOnInit() {
    this.eventService.getAll().subscribe(events => {
      this.allEvents = events;
      this.totalEvents = events.length;
      this.filteredEvents = this.paginate(events);
    });
  }

  onFiltersChanged(filters: any[]) {
    this.searchBarFilters = filters;
    this.currentPage = 1;

    if (filters.length === 0) {
      this.filteredEvents = this.paginate(this.allEvents);
      this.totalEvents = this.allEvents.length;
    } else {
      this.eventService.getFilteredEvents(filters).subscribe(events => {
        this.totalEvents = events.length;
        this.filteredEvents = this.paginate(events);
      });
    }
  }

  paginate(events: any[]) {
    const start = (this.currentPage - 1) * this.pageSize;
    return events.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.onFiltersChanged(this.searchBarFilters);
  }

  deleteFilter(filter: any) {
    this.searchBarFilters = this.searchBarFilters.filter(f => f.id !== filter.id);
    this.onFiltersChanged(this.searchBarFilters);
  }
}
