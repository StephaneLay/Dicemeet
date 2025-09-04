import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header-component/header-component";
import { FooterComponent } from "../../shared/footer-component/footer-component";

@Component({
  selector: 'app-home-component',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

}
