import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/UserService/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-other-profile-component',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './other-profile-component.html',
  styleUrl: './other-profile-component.css'
})
export class OtherProfileComponent {

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  userId = this.route.snapshot.paramMap.get('id');
  user$ = this.userService.getUserById(Number(this.userId));
  currentUser$ = this.userService.getCurrentUser();


  onInit(): void {

    this.userService.getCurrentUser().subscribe({
      next: (currentUser) => {
        console.log(currentUser.id, this.userId);
        if (currentUser.id == Number(this.userId)) {
          this.router.navigate(['/profile']);
        }
      }
    });
  }
}