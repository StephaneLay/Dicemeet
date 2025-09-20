import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/UserService/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { catchError, of } from 'rxjs';
import { GameCard } from '../../shared/game-card/game-card';
import { PlaceCard } from '../../shared/place-card/place-card';

@Component({
  selector: 'app-other-profile-component',
  imports: [AsyncPipe, DatePipe,GameCard,PlaceCard],
  templateUrl: './other-profile-component.html',
  styleUrl: './other-profile-component.css'
})
export class OtherProfileComponent {

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  userId = this.route.snapshot.paramMap.get('id');
  user$ = this.userService.getUserById(Number(this.userId)).pipe(
  catchError(err => {
    if (err.status === 404) {
      this.router.navigate(['/not-found']);
    }
    return of(null);
  })
);
  currentUser$ = this.userService.getCurrentUser();


  ngOnInit(): void {

    this.userService.getCurrentUser().subscribe({
      next: (currentUser) => {
        if (currentUser.id == Number(this.userId)) {
          this.router.navigate(['/profile']);
        }
      }
    });
  }
}