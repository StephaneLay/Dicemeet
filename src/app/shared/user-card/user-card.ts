import { Component, Input } from '@angular/core';
import { User } from '../models/user-model';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [RouterModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  @Input() user!: User;
}
