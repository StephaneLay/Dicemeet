import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SearchService } from '../../core/services/SearchService/search-service';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  searchTerm = '';
  searchInput$ = new Subject<string>();
  suggestions$ = this.searchInput$.pipe(
    debounceTime(300),
    switchMap(query => this.searchService.search(query))
  );

  @Output() filtersChanged = new EventEmitter<any[]>();
  selectedFilters: any[] = [];

  searchService = inject(SearchService);

  onSearchChange() {
    this.searchInput$.next(this.searchTerm);
  }

  selectItem(item: any) {
    const formattedItem = {
      name: item.name || item.title || 'Sans nom',
      type: item.type
    };

    console.log('Selected item:', formattedItem);

    if (!this.selectedFilters.find(f => f.name === formattedItem.name && f.type === formattedItem.type)) {
      this.selectedFilters.push(formattedItem);
      this.filtersChanged.emit(this.selectedFilters);
    }

    this.searchTerm = '';
    this.searchInput$.next('');
  }

  removeFilter(item: any) {
    this.selectedFilters = this.selectedFilters.filter(f => f !== item);
    this.filtersChanged.emit(this.selectedFilters);
  }
}
