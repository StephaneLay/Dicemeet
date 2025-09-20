import { Component, Input } from '@angular/core';
import { Game } from '../models/games-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [RouterLink],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
  @Input() game!: Game;

}
