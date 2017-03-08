import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckboxModule, SharedModule, InputTextModule, DialogModule, SliderModule } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './logIn/login.component';
import { SignUpComponent } from './signUp/signUp.component';
import { ThirdPartyExamplesComponent } from './thirdPartyExamples/thirdPartyExamples.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputComponent } from './input/input.component';
import { CardsRecognitionComponent } from './cardsRecognition/cardsRecognition.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

import { TableModule } from './thirdPartyInherited/table';
import { SwitchModule } from './thirdPartyInherited/switch';

enableProdMode();

@NgModule({
    imports: [
        BrowserModule, HttpModule, AppRoutingModule, FormsModule, ReactiveFormsModule,
        Ng2CompleterModule, NgbModule.forRoot(), CheckboxModule, SharedModule, BrowserModule,
        InputTextModule, DialogModule, SliderModule, SwitchModule, TableModule
    ],
    declarations: [
        AppComponent, HomeComponent, LoginComponent, SignUpComponent, ThirdPartyExamplesComponent,
        DashboardComponent, InputComponent, CardsRecognitionComponent, QuestionnaireComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }