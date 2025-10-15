import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-event-component',
  imports: [ReactiveFormsModule],
  templateUrl: './create-event-component.html',
  styleUrl: './create-event-component.css'
})
export class CreateEventComponent {
  //Mettre de la searchbar dans le form pour input des jeux/bars et villes
  eventForm = new FormGroup('')
  
}
