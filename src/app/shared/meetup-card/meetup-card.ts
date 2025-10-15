import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-meetup-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './meetup-card.html',
  styleUrl: './meetup-card.css'
})
export class MeetupCard {
  @Input () meetup: any;
}
