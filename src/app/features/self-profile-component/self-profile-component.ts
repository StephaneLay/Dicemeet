import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/UserService/user-service';
import { User } from '../../shared/models/user-model';
import { firstValueFrom, Observable,} from 'rxjs';
import {  ReactiveFormsModule,  FormsModule,  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-self-profile-component',
  imports: [ReactiveFormsModule, AsyncPipe, FormsModule,DatePipe,NgFor,NgIf],
  templateUrl: './self-profile-component.html',
  styleUrl: './self-profile-component.css'
})
export class SelfProfileComponent {

  userService = inject(UserService);
  http = inject(HttpClient);

  user$!: Observable<User>;
  editing = {
    imgUrl: false,
    bio: false,
    city: false,
    traits: false
  };

  edited: Partial<User> = {};
  newTrait: string = '';
  selectedFile!: File;

  async ngOnInit() {
    const userId = await firstValueFrom(this.userService.getCurrentUserId());
    this.user$ = this.userService.getUserById(userId);
  }

  toggleEdit(field: keyof typeof this.editing) {
    this.editing[field] = !this.editing[field];
    if (!this.editing[field]) {
      // remettre edited[field] à vide si on annule
      this.edited[field] = undefined;
    }
  }

  editField(field: keyof typeof this.editing) {
    this.editing[field] = true;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // tu peux uploader direct après sélection
    this.uploadAvatar();
  }

  uploadAvatar() {
    const formData = new FormData();
    formData.append('avatar', this.selectedFile);

    // this.userService.uploadAvatar(formData).subscribe({
    //   next: (res) => {
    //     console.log('Avatar mis à jour', res);
    //     this.editing.imgUrl = false;
    //     // refresh user$ si besoin
    //     this.ngOnInit();
    //   }
    // });
  }

  editTrait(index: number) {
    this.editing.traits = true;
    // logique spécifique pour modifier un trait existant
  }

  addTrait() {
    if (!this.edited.traits) this.edited.traits = [];
    this.edited.traits.push(this.newTrait);
    this.newTrait = '';
  }

  hasEdits() {
    return Object.values(this.edited).some(v => v !== undefined && v !== null);
  }

  saveProfile() {
    // appelle ton endpoint API pour update le profil
    // this.userService.updateProfile(this.edited).subscribe(() => {
    //   console.log('Profil mis à jour');
    //   this.ngOnInit(); // refresh
    //   this.edited = {};
    //   this.editing = { imgUrl: false, bio: false, city: false, traits: false };
    // });
  }


}