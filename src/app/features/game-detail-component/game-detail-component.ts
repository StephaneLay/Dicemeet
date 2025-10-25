import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../core/services/GameService/game-service';
import { AsyncPipe } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-game-detail-component',
  imports: [AsyncPipe],
  templateUrl: './game-detail-component.html',
  styleUrl: './game-detail-component.css'
})
export class GameDetailComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  gameService = inject(GameService);

  game$ = this.gameService.getGameById(this.route.snapshot.params['id']).pipe
  (catchError(err => {
    if (err.status === 404) {
      this.router.navigate(['/not-found'])
    }
    return of(undefined);
  }));

 
}
