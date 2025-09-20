import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../core/services/PlaceService/place-service';
import { catchError, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-place-detail-component',
  imports: [AsyncPipe],
  templateUrl: './place-detail-component.html',
  styleUrl: './place-detail-component.css'
})
export class PlaceDetailComponent {

  router = inject(Router)
  route = inject(ActivatedRoute);
  placeService = inject(PlaceService);

  place$ = this.placeService.getPlaceById(this.route.snapshot.params['id']).pipe(
    catchError(err => {
      if (err.status === 404) {
        this.router.navigate(['/not-found'])
      }
      return of(null);
    }));
}
