import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckboxModule, SharedModule, InputTextModule, DialogModule } from 'primeng/primeng';
import { DataTableModule, InputSwitchModule } from 'primeng/primeng';

import { ToggleButtonModule } from 'primeng/primeng';
import { ButtonModule } from './inheritance/toggle';

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
import { InheritanceComponent } from './inheritance/inherit.component';
import { InputComponent } from './input/input.component';

import { TableModule } from './table/table';

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes),
        FormsModule, ReactiveFormsModule, Ng2CompleterModule, NgbModule.forRoot(),
        CheckboxModule, DataTableModule, /*TableModule,*/ SharedModule, BrowserModule,
        InputTextModule, ButtonModule, DialogModule, ButtonModule, InputSwitchModule
    ],
    declarations: [
        AppComponent, HomeComponent, LoginComponent, SignUpComponent, MainPageComponent,
        DashboardComponent, InheritanceComponent, InputComponent
    ],
    providers: [HttpService, LoginService, UserGuard, AdminGuard, AlertService],
    //        schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap: [AppComponent]
})
export class AppModule { }
