import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { SearchService } from '../../core/services/SearchService/search-service';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  imports: [ FormsModule ,NgFor,NgIf],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {

  searchTerm = '';
  searchInput$ = new Subject<string>();
  suggestions: any[] = [];
  selectedFilters: any[] = [];

  @Output() filtersChanged = new EventEmitter<any[]>();


  constructor(private searchService: SearchService) {
    this.setupSearchListener(); 
  }

  setupSearchListener() {
    this.searchInput$
      .pipe(
        debounceTime(300),
        switchMap(query => this.searchService.search(query))
      )
      .subscribe(results => {
        this.suggestions = results;
      });
  }

  onSearchChange() {
    this.searchInput$.next(this.searchTerm);
  }

  selectItem(item: any) {
    if (!this.selectedFilters.find(f => f.id === item.id && f.type === item.type)) {
      this.selectedFilters.push(item);
    }
    this.searchTerm = '';
    this.suggestions = [];
    this.filterEvents(); 
  }

  removeFilter(item: any) {
    this.selectedFilters = this.selectedFilters.filter(f => f !== item);
    this.filterEvents();
  }

  filterEvents() {
    this.filtersChanged.emit(this.selectedFilters);
  }
}
