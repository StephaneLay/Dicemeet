import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { GamesListComponent } from './features/games-list-component/games-list-component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'/parties',component:GamesListComponent},
];
