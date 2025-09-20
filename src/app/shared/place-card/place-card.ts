import { Component, Input } from '@angular/core';
import { Place } from '../models/places-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-place-card',
  imports: [RouterLink],
  templateUrl: './place-card.html',
  styleUrl: './place-card.css'
})
export class PlaceCard {
  @Input() place!: Place;
}
