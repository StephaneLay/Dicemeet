import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { GamesListComponent } from './features/games-list-component/games-list-component';
import { LoginComponent } from './features/login-component/login-component';
import { SubscribeComponent } from './features/subscribe-component/subscribe-component';
import { SelfProfileComponent } from './features/self-profile-component/self-profile-component';
import { OtherProfileComponent } from './features/other-profile-component/other-profile-component';
import { AuthGuard } from './core/services/auth/guard/auth-guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'parties',component:GamesListComponent},
    {path:'login',component:LoginComponent},
    {path:'subscribe',component:SubscribeComponent},
    {path:'profile',component:SelfProfileComponent , canActivate: [AuthGuard]},
    {path:'profile/:id',component:OtherProfileComponent , canActivate: [AuthGuard]},
];
