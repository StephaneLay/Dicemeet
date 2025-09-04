import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { GamesListComponent } from './features/games-list-component/games-list-component';
import { LoginComponent } from './features/login-component/login-component';
import { SubscribeComponent } from './features/subscribe-component/subscribe-component';
import { SelfProfileComponent } from './features/self-profile-component/self-profile-component';
import { OtherProfileComponent } from './features/other-profile-component/other-profile-component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'parties',component:GamesListComponent},
    {path:'login',component:LoginComponent},
    {path:'subscribe',component:SubscribeComponent},
    {path:'profile',component:SelfProfileComponent},
    {path:'profile/1',component:OtherProfileComponent} //ID A METTRE DANS LA ROUTE OFC,
];
