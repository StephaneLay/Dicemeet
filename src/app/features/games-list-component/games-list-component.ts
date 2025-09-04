import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header-component/header-component";
import { FooterComponent } from "../../shared/footer-component/footer-component";

@Component({
  selector: 'app-games-list-component',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './games-list-component.html',
  styleUrl: './games-list-component.css'
})
export class GamesListComponent {

}
