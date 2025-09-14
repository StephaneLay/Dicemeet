import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/UserService/user-service';
import { ActivatedRoute } from '@angular/router';
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

  userId = this.route.snapshot.paramMap.get('id');
  user$ = this.userService.getUserById(Number(this.userId));

}
