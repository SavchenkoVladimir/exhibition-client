import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';

import { LoginService } from './services/login.service';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './logIn/login.component';
import { SignUpComponent } from './signUp/signUp.component';
import { ThirdPartyExamplesComponent } from './thirdPartyExamples/thirdPartyExamples.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputComponent } from './input/input.component';
import { CardsRecognitionComponent } from './cardsRecognition/cardsRecognition.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent, canActivate: [UserGuard] },
    { path: 'thirdPartyExamples', component: ThirdPartyExamplesComponent, canActivate: [UserGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    { path: 'input', component: InputComponent, canActivate: [AdminGuard] },
    { path: 'cardsRecognition', component: CardsRecognitionComponent, canActivate: [AdminGuard] },
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
