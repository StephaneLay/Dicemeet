import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./features/home-component/home-component";
import { HeaderComponent } from "./shared/header-component/header-component";
import { FooterComponent } from "./shared/footer-component/footer-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DiceMeet');
}
