import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { GamesListComponent } from './features/games-list-component/games-list-component';
import { LoginComponent } from './features/login-component/login-component';
import { SubscribeComponent } from './features/subscribe-component/subscribe-component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'parties',component:GamesListComponent},
    {path:'login',component:LoginComponent},
    {path:'subscribe',component:SubscribeComponent},
];
