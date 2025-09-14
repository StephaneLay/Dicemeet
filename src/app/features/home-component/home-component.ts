import { Component, inject } from '@angular/core';
import { CategoryService } from '../../core/services/CategoryService/category-service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

    categoryService = inject(CategoryService);
    categories = this.categoryService.getAllCategories();
}
