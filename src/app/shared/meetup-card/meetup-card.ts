import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meetup } from '../models/meetup-model';
import { UserService } from '../../core/services/UserService/user-service';
import { UserCard } from '../user-card/user-card';
import { Observable, of } from 'rxjs';
import { User } from '../models/user-model';

@Component({
  selector: 'app-meetup-card',
  imports: [CommonModule, RouterLink, UserCard,AsyncPipe],
  templateUrl: './meetup-card.html',
  styleUrl: './meetup-card.css'
})
export class MeetupCard {
  @Input () meetup!: Meetup;
  userService = inject(UserService);
  owner$!: Observable<User>;

  ngOnInit(): void {
    this.userService.getUserById(this.meetup.ownerId).subscribe({
      next: (owner) => {
        this.owner$ = of(owner);
      }
    });
  }
}
