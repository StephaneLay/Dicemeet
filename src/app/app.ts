import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header-component/header-component";
import { FooterComponent } from "./shared/footer-component/footer-component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtInterceptor } from './core/services/auth/interceptor/auth-interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true }]

})
export class App {
  protected readonly title = signal('DiceMeet');
}
