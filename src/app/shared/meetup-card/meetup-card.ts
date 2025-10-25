import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meetup } from '../models/meetup-model';

@Component({
  selector: 'app-meetup-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './meetup-card.html',
  styleUrl: './meetup-card.css'
})
export class MeetupCard {
  @Input () meetup!: Meetup;
}
