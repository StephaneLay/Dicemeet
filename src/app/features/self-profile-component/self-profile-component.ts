import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/UserService/user-service';
import { User } from '../../shared/models/user-model';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TraitsService } from '../../core/services/TraitsService/traits-service';
import { Trait } from '../../shared/models/traits-model';

@Component({
  selector: 'app-self-profile-component',
  imports: [ReactiveFormsModule, FormsModule, DatePipe, AsyncPipe],
  templateUrl: './self-profile-component.html',
  styleUrl: './self-profile-component.css'
})
export class SelfProfileComponent {

  fb = inject(FormBuilder);
  userService = inject(UserService);
  traitsService = inject(TraitsService);

  traits$ = this.traitsService.getAllTraits();
  selectTraits: boolean = false;
  currentTraitSlot!: number | null;
  imgPreview: string | null = null;

  profileForm: FormGroup = this.fb.group({
    img: [null],
    name: [''],
    bio: [''],
    city: [''],
    traits: [[]]
  });

  user?: User; // copie locale pour comparer si besoin

  async ngOnInit() {
    // Récupérer l'utilisateur une seule fois
    this.user = await firstValueFrom(this.userService.getCurrentUser());
    console.log(this.user);

    // Pré-remplir le formulaire
    this.profileForm.patchValue({
      img: this.user.imgUrl,
      name: this.user.name,
      bio: this.user.bio,
      city: this.user.city,
      traits: this.user.traits ?? []
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileForm.patchValue({ img: file });
      this.profileForm.get('img')?.markAsDirty();

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  get displayImg(): string {
    const imgControl = this.profileForm.get('img')?.value;
    // Si imgControl est un File et qu'on a preview => afficher preview
    if (imgControl instanceof File && this.imgPreview) {
      return this.imgPreview;
    }
    // Sinon afficher URL de l'utilisateur
    return this.user?.imgUrl ?? '';
  }

  displayTraits() {
    this.currentTraitSlot = null;
    this.selectTraits = true;
  }

  modifyTraitSlot(index: number) {
    this.currentTraitSlot = index;
    this.selectTraits = true;
  }

  addTrait(trait: Trait) {
    const currentTraits: Trait[] = this.profileForm.get('traits')?.value || [];
    if (!currentTraits.includes(trait)) {
      if (this.currentTraitSlot !== null) {
        currentTraits[this.currentTraitSlot] = trait;
      } else {
        currentTraits.push(trait);
      }
      this.profileForm.get('traits')?.setValue(currentTraits);
      this.profileForm.get('traits')?.markAsDirty();
      this.selectTraits = false;
    }
  }

  async saveProfile() {
    if (!this.user) return;

    // Extraire uniquement les champs modifiés
    const changes: Partial<User> = {};
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      if (control?.dirty) {
        changes[key as keyof User] = control.value;
      }
    });

    if (Object.keys(changes).length === 0) {
      console.log('Aucun changement détecté');
      return;
    }

    const img = this.profileForm.get('img')?.value;

    // --- Cas 1 : fichier image présent ---
    if (img instanceof File) {
      const formData = new FormData();

      // Ajouter les champs simples
      Object.keys(changes).forEach(key => {
        if (key === 'traits') {
          formData.append(key, JSON.stringify(changes[key as keyof User]));
        } else if (key !== 'img') {
          const value = changes[key as keyof User];
          if (value !== undefined && value !== null) {
            if (typeof value === 'string') {
              formData.append(key, value);
            } else {
              // Pour nombres ou tableaux, on stringify
              formData.append(key, JSON.stringify(value));
            }
          }
        }
      });

      // Ajouter le fichier
      formData.append('img', img);
      console.log('FormData to be sent:', formData);
      await firstValueFrom(this.userService.updateUser(formData));

    } else {
      // --- Cas 2 : pas de fichier image, envoyer JSON ---
      await firstValueFrom(this.userService.updateUser(changes));
    }
    console.log('Final Object' , this.profileForm.value);
    // Reset dirty flags après sauvegarde
    this.profileForm.markAsPristine();
    this.ngOnInit(); // recharger les données
  }

}