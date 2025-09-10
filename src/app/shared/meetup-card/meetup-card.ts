import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meetup-card',
  imports: [CommonModule],
  templateUrl: './meetup-card.html',
  styleUrl: './meetup-card.css'
})
export class MeetupCard {
  @Input () meetup: any;
}
