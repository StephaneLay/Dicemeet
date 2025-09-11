import { Component, inject } from '@angular/core';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { EventService } from '../../core/services/EventService/event-service';
import { MeetupCard } from '../../shared/meetup-card/meetup-card';
import { Meetup } from '../../shared/models/meetup-model';
import { map, Observable, of } from 'rxjs';
import { Filter } from '../../shared/models/filter-model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-games-list-component',
  imports: [SearchBar, MeetupCard, AsyncPipe],
  templateUrl: './games-list-component.html',
  styleUrl: './games-list-component.css'
})
export class GamesListComponent {


  //REMARQUE : ON POURRAIT OPTI LA PAGINATION EN FAISANT DIRECT LA REQUETE SQL QUI LIMITE

  // On a des problemes pour dire que la liste est vide , et de toute facon on doit ameliorer la recherche :
  // Certains tags sont contradictoires: bars pas dans la bonne ville , deux villes opposées etc
  // ===> DETERMINER LE COMPORTEMENT QU'ON VEUT APPLIQUER

  eventService = inject(EventService);

  //Premiere update
  constructor() { }
  ngOnInit() {
    this.UpdateMeetups();
  }

  // Pagination
  currentPage = 1;
  pageSize = 10;

  meetups$!: Observable<Meetup[]>
  meetupNumber!: number ;

  filters: Filter[] = [];

  //Ajoute un filtre puis actualise la liste
  addfilter(filter: Filter) {
    if (!this.filters.includes(filter)) {
      this.filters.push(filter);
      this.currentPage = 1;
      this.UpdateMeetups();
    }
  }

  //Supprime un filtre puis actualise la liste
  deleteFilter(filter: Filter) {
    this.filters = this.filters.filter(f => f.name !== filter.name || f.type !== filter.type);
    this.currentPage = 1;
    this.UpdateMeetups();

  }

  //RESET LA LIST DES MEETUP SUR GETALL
  deleteAllFilters() {
    this.filters = [];
    this.currentPage = 1;
    this.UpdateMeetups();
  }

  //Selon filtre fait une recherche globale ou filtrée , puis pagine
  UpdateMeetups() {
    
    this.meetups$ = this.filters.length > 0 ? this.eventService.getFilteredEvents(this.filters) : this.eventService.getAll();

    this.meetups$ = this.meetups$.pipe(
      map(meetups => {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.meetupNumber = meetups.length;
        return meetups.slice(start, end);
      })
    );

    
  }

  changePage(page: number) {
    this.currentPage = page;
    this.UpdateMeetups();
  }

}
