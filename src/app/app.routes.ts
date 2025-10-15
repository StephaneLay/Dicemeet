import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { GamesListComponent } from './features/games-list-component/games-list-component';
import { LoginComponent } from './features/login-component/login-component';
import { SubscribeComponent } from './features/subscribe-component/subscribe-component';
import { SelfProfileComponent } from './features/self-profile-component/self-profile-component';
import { OtherProfileComponent } from './features/other-profile-component/other-profile-component';
import { AuthGuard } from './core/services/auth/guard/AuthGuard/auth-guard';
import { MessagesComponent } from './features/messages-component/messages-component';
import { NotFoundComponent } from './features/not-found-component/not-found-component';
import { DashboardComponent } from './features/dashboard-component/dashboard-component';
import { HomeGuard } from './core/services/auth/guard/HomeGuard/home-guard';
import { GameDetailComponent } from './features/game-detail-component/game-detail-component';
import { PlaceDetailComponent } from './features/place-detail-component/place-detail-component';
import { CreateEventComponent } from './features/create-event-component/create-event-component';
import { ManageEventComponent } from './features/manage-event-component/manage-event-component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [HomeGuard], },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'parties', component: GamesListComponent , canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'subscribe', component: SubscribeComponent },
    { path: 'profile', component: SelfProfileComponent, canActivate: [AuthGuard] },
    { path: 'profile/:id', component: OtherProfileComponent, canActivate: [AuthGuard] },
    { path: 'events/create', component: CreateEventComponent, canActivate: [AuthGuard] },
    { path: 'events/:id', component: ManageEventComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
    { path: 'games/:id', component: GameDetailComponent, canActivate: [AuthGuard] },
    { path: 'places/:id', component: PlaceDetailComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
];
