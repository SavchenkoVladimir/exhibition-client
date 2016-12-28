import { Routes } from '@angular/router';

import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './logIn/login.component';
import { SignUpComponent } from './signUp/signUp.component';
import { MainPageComponent } from './mainPage/mainPage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputComponent } from './input/input.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent, canActivate: [UserGuard] },
    { path: 'mainPage', component: MainPageComponent, canActivate: [UserGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    { path: 'input', component: InputComponent, canActivate: [AdminGuard] },
];
