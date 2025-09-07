import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../shared/header-component/header-component";
import { FooterComponent } from "../../shared/footer-component/footer-component";
import { CategoryService } from '../../core/services/CategoryService/category-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home-component',
  imports: [AsyncPipe],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

    categoryService = inject(CategoryService);
    categories = this.categoryService.getAllCategories();
}
