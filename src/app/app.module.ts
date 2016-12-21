import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckboxModule, DataTableModule } from 'primeng/primeng';

import { LoginService } from './services/login.service';
import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';
import { HttpService } from './http/http.service';
import { AlertService } from './helpers/alert.service';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './logIn/login.component';
import { SignUpComponent } from './signUp/signUp.component';
import { MainPageComponent } from './mainPage/mainPage.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes),
        FormsModule, ReactiveFormsModule, Ng2CompleterModule, NgbModule.forRoot(),
        CheckboxModule, DataTableModule
    ],
    declarations: [
        AppComponent, HomeComponent, LoginComponent, SignUpComponent, MainPageComponent,
        DashboardComponent
    ],
    providers: [HttpService, LoginService, UserGuard, AdminGuard, AlertService],
    bootstrap: [AppComponent]
})
export class AppModule { }
