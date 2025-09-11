import { Component, ElementRef, EventEmitter, inject, Output, viewChild } from '@angular/core';
import { SearchService } from '../../core/services/SearchService/search-service';
import { debounceTime, of, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Filter } from '../models/filter-model';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {

  //Texte de la barre de recherche et Subject pour les changements
  searchTerm = '';
  searchInput$ = new Subject<string>();



  //Emet tous les filtres selectionnés au composant parent
  @Output() filtersChanged = new EventEmitter<Filter>();

  searchService = inject(SearchService);

  //Liste qui se met a jour lors de la recherche ( et n'affiche rien si la barre est vide)
  suggestions$ = this.searchInput$.pipe(
    debounceTime(300),
    switchMap(query => query ? this.searchService.search(query) : of([]))
  );

  //Met a jour la liste des suggestions lors de la saisie
  onSearchChange() {
    this.searchInput$.next(this.searchTerm);
  }

  selectItem(filter: Filter) {

    //Evite les doublons dans les filtres selectionnés
    this.filtersChanged.emit(filter);

    //Reset la barre de recherche et les suggestions
    this.searchTerm = '';
    this.searchInput$.next('');
  }


}
