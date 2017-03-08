import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';

import { LoginService } from './services/login.service';
import { HttpService } from './http/http.service';
import { AlertService } from './helpers/alert.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './logIn/login.component';
import { SignUpComponent } from './signUp/signUp.component';
import { MainPageComponent } from './mainPage/mainPage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputComponent } from './input/input.component';
import { CameraComponent } from './camera/camera.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent, canActivate: [UserGuard] },
    { path: 'mainPage', component: MainPageComponent, canActivate: [UserGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    { path: 'input', component: InputComponent, canActivate: [AdminGuard] },
    { path: 'camera', component: CameraComponent, canActivate: [AdminGuard] },
    { path: 'questionnaire', component: QuestionnaireComponent, canActivate: [UserGuard] },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    providers: [HttpService, LoginService, UserGuard, AdminGuard, AlertService],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
